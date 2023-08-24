import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GetPokemonDataService } from './get-pokemon-data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PokemonsListType } from '../types/types';

describe('Get Pokemon Data Service', () => {
  let service: GetPokemonDataService;
  let httpClient: HttpClient;
  let httpTestControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetPokemonDataService],
    });
    service = TestBed.inject(GetPokemonDataService);
  });

  beforeEach(() => {
    service = TestBed.inject(GetPokemonDataService);
    httpTestControler = TestBed.inject(HttpTestingController);
  });
  it('Get Pockemon List Data from API', () => {
    const testData: PokemonsListType = {
      count: 1250,
      next: null,
      previous: null,
      results: [],
    };
    service.getPokemonsList().subscribe((post) => {
      expect(testData).toBe(post, 'should check mocked data');
    });

    const req = httpTestControler.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
    );
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testData);
    httpTestControler.verify();
  });
});
