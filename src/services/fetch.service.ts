import { HttpClient } from '@angular/common/http';

export class FetchService<T> {
  constructor(private http: HttpClient, private fetchUrl: string) {}

  loaded = false;
  loading = false;
  protected value: T | null = null;

  load() {
    this.loading = true;

    this.http.get(this.fetchUrl).subscribe((value) => {
      this.loading = false;
      this.loaded = true;
      this.value = value as T;
    });
  }
}
