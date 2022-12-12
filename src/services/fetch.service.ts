import { HttpClient } from '@angular/common/http';

export class FetchService<T> {
  constructor(private http: HttpClient, private fetchUrl: string) {}

  pristine = true;
  loaded = false;
  loading = false;
  protected value: T | null = null;

  load() {
    this.pristine = false;
    this.loading = true;

    this.http.get(this.fetchUrl).subscribe((value) => {
      this.loading = false;
      this.loaded = true;
      this.value = value as T;
    });
  }
}
