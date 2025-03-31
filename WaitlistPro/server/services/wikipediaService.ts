import axios from 'axios';
import * as cheerio from 'cheerio';
import { htmlToText } from 'html-to-text';

interface WikipediaPage {
  title: string;
  extract: string;
  url: string;
  thumbnail?: string;
  images?: string[];
  timeline?: TimelineEvent[];
}

interface TimelineEvent {
  year: number;
  description: string;
}

interface WikipediaSearchResult {
  pageid: number;
  title: string;
  snippet: string;
  thumbnail?: {
    source: string;
  };
}

/**
 * Service for fetching and parsing Wikipedia data
 */
export class WikipediaService {
  private baseUrl = 'https://en.wikipedia.org/w/api.php';
  
  /**
   * Search Wikipedia for a query
   */
  async search(query: string): Promise<WikipediaSearchResult[]> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          srsearch: query,
          srinfo: 'snippet',
          srprop: 'snippet|titlesnippet',
          origin: '*',
          srlimit: 10
        }
      });
      
      return response.data.query.search;
    } catch (error) {
      console.error('Error searching Wikipedia:', error);
      throw new Error('Failed to search Wikipedia');
    }
  }
  
  /**
   * Get detailed information about a Wikipedia page
   */
  async getPageDetails(title: string): Promise<WikipediaPage> {
    try {
      // Get page content
      const response = await axios.get(this.baseUrl, {
        params: {
          action: 'query',
          format: 'json',
          titles: title,
          prop: 'extracts|pageimages|info',
          inprop: 'url',
          pithumbsize: 500,
          exintro: 1,
          explaintext: 1,
          origin: '*'
        }
      });
      
      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];
      
      // Get images for the page
      const imagesResponse = await axios.get(this.baseUrl, {
        params: {
          action: 'query',
          format: 'json',
          titles: title,
          prop: 'images',
          imlimit: 20,
          origin: '*'
        }
      });
      
      const imagePages = imagesResponse.data.query.pages;
      const imagePageId = Object.keys(imagePages)[0];
      const images = imagePages[imagePageId].images || [];
      
      // Get the actual image URLs
      const imageUrls = await this.getImageUrls(images.slice(0, 5).map((img: any) => img.title));
      
      // Extract a timeline from the raw HTML content
      const htmlResponse = await axios.get(`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`);
      const timeline = this.extractTimelineFromHtml(htmlResponse.data);
      
      return {
        title: page.title,
        extract: page.extract,
        url: page.fullurl,
        thumbnail: page.thumbnail?.source,
        images: imageUrls,
        timeline
      };
    } catch (error) {
      console.error('Error getting Wikipedia page details:', error);
      throw new Error('Failed to get Wikipedia page details');
    }
  }
  
  /**
   * Get actual URLs for image titles
   */
  private async getImageUrls(imageTitles: string[]): Promise<string[]> {
    if (imageTitles.length === 0) return [];
    
    try {
      const imageUrlsResponse = await axios.get(this.baseUrl, {
        params: {
          action: 'query',
          format: 'json',
          titles: imageTitles.join('|'),
          prop: 'imageinfo',
          iiprop: 'url',
          origin: '*'
        }
      });
      
      const pages = imageUrlsResponse.data.query.pages;
      const urls: string[] = [];
      
      for (const pageId in pages) {
        const page = pages[pageId];
        if (page.imageinfo && page.imageinfo.length > 0) {
          // Skip SVG and icon files which are often not useful for our purpose
          if (!page.title.toLowerCase().includes('.svg') && 
              !page.title.toLowerCase().includes('icon') && 
              !page.title.toLowerCase().includes('logo') &&
              page.imageinfo[0].url.includes('commons')) {
            urls.push(page.imageinfo[0].url);
          }
        }
      }
      
      return urls;
    } catch (error) {
      console.error('Error getting image URLs:', error);
      return [];
    }
  }
  
  /**
   * Extract a timeline from the HTML content of a Wikipedia page
   */
  private extractTimelineFromHtml(html: string): TimelineEvent[] {
    try {
      const $ = cheerio.load(html);
      const timeline: TimelineEvent[] = [];
      
      // Look for paragraphs containing years
      $('p').each((_: number, element: any) => {
        const text = $(element).text();
        const yearMatches = text.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/g); // Years from 1000-2029
        
        if (yearMatches && yearMatches.length > 0) {
          // For each year found in the paragraph
          yearMatches.forEach((yearStr: string) => {
            const year = parseInt(yearStr);
            
            // Get the sentence containing the year
            const sentences = text.split(/[.!?]+/);
            for (const sentence of sentences) {
              if (sentence.includes(yearStr)) {
                timeline.push({
                  year,
                  description: sentence.trim()
                });
                break;
              }
            }
          });
        }
      });
      
      // Look for timeline or history sections which often contain important dates
      $('h2, h3, h4').each((_: number, element: any) => {
        const headingText = $(element).text().toLowerCase();
        if (headingText.includes('history') || headingText.includes('timeline')) {
          const section = $(element).next();
          
          // Check if there are lists in this section
          section.find('li').each((_: number, listItem: any) => {
            const itemText = $(listItem).text();
            const yearMatch = itemText.match(/\b(1[0-9]{3}|20[0-2][0-9])\b/);
            
            if (yearMatch) {
              timeline.push({
                year: parseInt(yearMatch[0]),
                description: itemText.trim()
              });
            }
          });
        }
      });
      
      // Sort by year and remove duplicates
      return timeline
        .sort((a, b) => a.year - b.year)
        .filter((event, index, self) => 
          index === self.findIndex(e => e.year === event.year && e.description === event.description)
        );
    } catch (error) {
      console.error('Error extracting timeline from HTML:', error);
      return [];
    }
  }
  
  /**
   * Get nearby locations based on coordinates
   */
  async getNearbyLocations(latitude: number, longitude: number): Promise<WikipediaSearchResult[]> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          action: 'query',
          format: 'json',
          list: 'geosearch',
          gscoord: `${latitude}|${longitude}`,
          gsradius: 10000, // 10km radius
          gslimit: 10,
          origin: '*'
        }
      });
      
      return response.data.query.geosearch;
    } catch (error) {
      console.error('Error getting nearby locations:', error);
      throw new Error('Failed to get nearby locations');
    }
  }
  
  /**
   * Get historical information for a place over time
   */
  async getHistoricalTimeline(query: string): Promise<{title: string, timeline: TimelineEvent[]}> {
    try {
      // First search for the query
      const searchResults = await this.search(query);
      
      if (searchResults.length === 0) {
        throw new Error('No Wikipedia results found for query');
      }
      
      // Get details for the top result
      const pageDetails = await this.getPageDetails(searchResults[0].title);
      
      return {
        title: pageDetails.title,
        timeline: pageDetails.timeline || []
      };
    } catch (error) {
      console.error('Error getting historical timeline:', error);
      throw new Error('Failed to get historical timeline');
    }
  }
}

export const wikipediaService = new WikipediaService();