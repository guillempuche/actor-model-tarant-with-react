import { Actor } from 'tarant';
import { None, Ok, Option, Result, Some } from 'ts-results';
import { simulateLoad } from '../repositories/simulate_load';

import {
  Error,
  ErrorLibraryRetrieveQuote,
  ErrorLibraryRetrieveQuotes
} from './common';
import { mock_authors, mock_quotes } from './mock_data';
import { IAuthor, IQuote } from './index';

export class ActorLibrary extends Actor {
  private readonly quotes: Map<string, IQuote>;
  private readonly authors: Map<string, IAuthor>;
  private readonly topic: ProtocolLibrary;

  constructor(topic: ProtocolLibrary) {
    super();

    this.quotes = new Map(
      mock_quotes.map((quote) => [quote.id, quote] as [string, IQuote])
    );
    this.authors = new Map(
      mock_authors.map((author) => [author.id, author] as [string, IAuthor])
    );
    this.topic = topic;
  }

  async load() {
    this.topic.onQuotesChanged(Array.from(this.quotes.values()));
    this.topic.onAuthorsChanged(Array.from(this.authors.values()));
    this.topic.onChange();
  }

  async retrieveAllQuotes(): Promise<
    Result<IQuote[], ErrorLibraryRetrieveQuotes>
  > {
    await simulateLoad();

    const quotes = Array.from(this.quotes.values());

    return Ok(quotes);
  }

  async getQuote(
    text: string
  ): Promise<Result<Option<IQuote>, ErrorLibraryRetrieveQuote>> {
    await simulateLoad();

    const found = Array.from(this.quotes.values()).find(
      (quote) => quote.text === text
    );

    return Ok(found != undefined ? Some(found) : None);
  }

  async addQuote(quote: IQuote): Promise<Result<None, Error<String>>> {
    await simulateLoad();

    this.quotes.set(quote.id, quote);
    return Ok(None);
  }

  async addAuthor(author: IAuthor): Promise<Result<None, Error<String>>> {
    this.authors.set(author.id, author);
    return Ok(None);
  }
}

export class ProtocolLibrary extends Actor {
  public constructor() {
    super();
  }

  onChange(): void {}
  onQuotesChanged(quotes: IQuote[]): void {}
  onAuthorsChanged(authors: IAuthor[]): void {}
}
