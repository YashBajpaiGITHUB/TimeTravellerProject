import { SearchForm } from "@/components/SearchForm";

export default function Search() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Chronos Time Machine
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Search for historical information and generate transition videos of how places, people, and objects have evolved over time.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <SearchForm />
      </div>
    </div>
  );
}