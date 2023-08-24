import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PokemonsListType,
  PokemonDetailsType,
  PokemonEvolutionType,
} from '../types/types';
import { switchMap, of, combineLatest, map, concat, zip } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetPokemonDataService {
  constructor(private http: HttpClient) {}

  getPokemonsList(offset = 0, limit = 10) {
    return this.http
      .get<PokemonsListType>(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      )
      .pipe(
        switchMap((data) => {
          const newResults$ = combineLatest(
            data.results.flatMap((r) =>
              this.getPokemonDetails(r.name).pipe(
                map((i: PokemonDetailsType) => ({
                  name: i.species?.name,
                  url: i.species?.url,
                  imageUrl: i.sprites?.front_default,
                }))
              )
            )
          );

          return zip(of(data), newResults$);
        }),
        map((allData) => ({
          count: allData[0].count,
          next: allData[0].next,
          previous: allData[0].previous,
          results: allData[1],
        }))
      );
  }

  getPokemonDetails(name: string) {
    return this.http.get<PokemonDetailsType>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }

  getPokemonEvolution(id: number) {
    return this.http.get<PokemonEvolutionType>(
      `https://pokeapi.co/api/v2/evolution-chain/${id}`
    );
  }
}
