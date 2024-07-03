import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider"

type BookmarkIconProps = {
  id: number
}

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIds, handleToggleBookmark } = useContext(BookmarksContext)

  return (
    <button className="bookmark-btn" onClick={() => handleToggleBookmark(id)}>
      <BookmarkFilledIcon className={`${bookmarkIds.includes(id) ? 'filled' : ''}`} />
    </button>
  );
}
