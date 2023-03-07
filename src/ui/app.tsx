import { useState } from 'react';

import { mock_authors, mock_quotes } from '../actors/mock_data';
import { Button } from './components_atomic';
import { CoLibraryItem } from './components_molecules';

// TODO: delete this after using actors.
const mockQuotes = Array.from(mock_quotes.values());
const mockAuthors = Array.from(mock_authors.values());

export function App() {
  // TODO: replace it by Actor's initial state
  const [library, setLibrary] = useState(['hi']);

  const [form, setForm] = useState({ quote: '', author: '' });

  function saveToLibrary(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO: save data via Actor
    console.log(form);

    setForm({ quote: '', author: '' });
  }

  return (
    <div className="flex flex-col grow h-screen max-w-lg mx-auto px-6 pt-3 pb-2 space-y-4 bg-white dark:bg-black">
      <div className="flex flex-col overflow-auto rounded-xl justify-start space-y-4">
        <h2 className="dark:text-white">Your Library</h2>
        {/**
         * TODO: show library elements from the actors
         */}
        {library.length == 0 ? (
          <div className="grow flex justify-center items-center rounded-3xl p-6 bg-green-100">
            <div className="text-center">You don't have quotes</div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <CoLibraryItem
              quote={mockQuotes[1].text}
              author={mockAuthors[0].fullname}
            />
            <CoLibraryItem
              quote={mockQuotes[1].text}
              author={mockAuthors[1].fullname}
            />
            <CoLibraryItem
              quote={mockQuotes[0].text}
              author={mockAuthors[0].fullname}
            />
          </div>
        )}
      </div>
      <div className="rounded-3xl p-5 bg-green-200 dark:bg-green-900">
        <form onSubmit={saveToLibrary} className="flex flex-col space-y-4">
          <textarea
            rows={3}
            placeholder="Write the quote..."
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className="w-full rounded-3xl p-4 dark:bg-stone-700 dark:text-white"
            style={{ resize: 'none' }}
          />
          <input
            placeholder="Write the author..."
            autoComplete="false"
            spellCheck="true"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="rounded-3xl p-4 dark:bg-stone-700 dark:text-white"
          />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  );
}
