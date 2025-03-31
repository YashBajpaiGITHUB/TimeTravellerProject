import axios from "axios";

const WIKIPEDIA_API_URL = "https://en.wikipedia.org/api/rest_v1/";

interface HistoricalData {
  id: number;
  title: string;
  summary: string;
  images: string[];
  searchId: number;
  createdAt: Date;
  timeline?: any[];
}

interface HistoricalSearch {
  id: number;
  query: string;
  type: string;
  userId: string | null;
  latitude: string | null;
  longitude: string | null;
  imageData: string | null;
  createdAt: Date;
}

class MemoryStorage {
  private historicalSearches: HistoricalSearch[] = [];
  private historicalData: HistoricalData[] = [];

  private async fetchWikipediaData(query: string) {
    try {
      const response = await axios.get(`${WIKIPEDIA_API_URL}${encodeURIComponent(query)}`);
      return {
        title: response.data.title,
        summary: response.data.extract,
        images: response.data.thumbnail ? [response.data.thumbnail.source] : [],
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching Wikipedia data:", error.message);
      } else {
        console.error("An unknown error occurred while fetching Wikipedia data.");
      }
      return null;
    }
  }

  public getAllHistoricalSearches(): HistoricalSearch[] {
    return this.historicalSearches;
  }

  public getHistoricalSearchByQuery(query: string): HistoricalSearch | undefined {
    return this.historicalSearches.find((search) => search.query.toLowerCase() === query.toLowerCase());
  }

  public async getWaitlistSubscriberByEmail(email: string): Promise<HistoricalSearch | undefined> {
    return this.historicalSearches.find((search) => search.query.toLowerCase() === email.toLowerCase());
  }

  public createHistoricalSearch(params: {
    query: string;
    type: string;
    userId: string | null;
    latitude: string | null;
    longitude: string | null;
    imageData: string | null;
  }): HistoricalSearch {
    const id = Date.now();
    const searchEntry: HistoricalSearch = {
      id,
      query: params.query,
      type: params.type,
      userId: params.userId,
      latitude: params.latitude,
      longitude: params.longitude,
      imageData: params.imageData,
      createdAt: new Date(),
    };
    this.historicalSearches.push(searchEntry);
    return searchEntry;
  }

  public async addWaitlistSubscriber(subscriber: { email: string }): Promise<HistoricalSearch> {
    const id = Date.now();
    const searchEntry: HistoricalSearch = {
      id,
      query: subscriber.email,
      type: "waitlist",
      userId: null,
      latitude: null,
      longitude: null,
      imageData: null,
      createdAt: new Date(),
    };
    this.historicalSearches.push(searchEntry);
    return searchEntry;
  }

  public async createHistoricalData(params: {
    title: string;
    summary: string;
    timeline: any[];
    images: string[];
    searchId: number;
  }): Promise<HistoricalData> {
    const id = Date.now();
    const data: HistoricalData = {
      id,
      title: params.title,
      summary: params.summary,
      timeline: params.timeline,
      images: params.images,
      searchId: params.searchId,
      createdAt: new Date(),
    };
    this.historicalData.push(data);
    return data;
  }

  public getAllHistoricalData(): HistoricalData[] {
    return this.historicalData;
  }

  public getHistoricalDataBySearchId(searchId: number): HistoricalData | undefined {
    return this.historicalData.find((data) => data.searchId === searchId);
  }
}

export const storage = new MemoryStorage();