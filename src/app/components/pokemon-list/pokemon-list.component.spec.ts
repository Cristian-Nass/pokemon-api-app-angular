import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GetPokemonDataService } from 'src/app/services/get-pokemon-data.service';
import { PokemonListComponent } from './pokemon-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Pokemon List Component', () => {
  let component: PokemonListComponent;
  let getPokemonDataService: GetPokemonDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [GetPokemonDataService, PokemonListComponent],
    });

    getPokemonDataService = TestBed.inject(GetPokemonDataService);
    httpMock = TestBed.inject(HttpTestingController);
    component = TestBed.inject(PokemonListComponent);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pokemon list', () => {
    const dummyPokemons = {
      count: 1,
      next: null,
      previous: null,
      results: [],
    };

    getPokemonDataService.getPokemonsList(0, 1).subscribe((pokemons) => {
      expect(pokemons).toEqual(dummyPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1'
    );

    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemons);

    httpMock.verify();
  });
});
