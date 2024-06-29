type SearchFormProps = {
  searchText: string
  setSearchText: (text: string) => void
}

export default function SearchForm({ searchText, setSearchText }: SearchFormProps ) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form action="#" className="search" onSubmit={handleSubmit}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
