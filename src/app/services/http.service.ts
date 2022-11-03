import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from './module';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params.set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfo = this.http.get<APIResponse<Game>>(
      `${env.BASE_URL}/games/${id}`
    );
    const gameTrailer = this.http.get<APIResponse<Game>>(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenShots = this.http.get<APIResponse<Game>>(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin([gameInfo, gameScreenShots, gameTrailer]).pipe(
      map((res: any) => {
        return {
          ...res[0],
          screenshots: res[1]?.results,
          trailers: res[2]?.results,
        };
      })
    );
  }
}
