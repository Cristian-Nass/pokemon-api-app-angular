import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GetPokemonDataService } from 'src/app/services/get-pokemon-data.service';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Pokemon Details Component', () => {
  let component: PokemonDetailsComponent;
  let getPokemonDataService: GetPokemonDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [GetPokemonDataService, PokemonDetailsComponent],
    });

    getPokemonDataService = TestBed.inject(GetPokemonDataService);
    httpMock = TestBed.inject(HttpTestingController);
    component = TestBed.inject(PokemonDetailsComponent);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pokemon details', () => {
    const dummyPokemonsDetails = {
      id: 1,
      name: 'bulbasaur',
      abilities: [],
      height: 1,
      weight: 1,
      species: {
        name: 'testName',
        url: 'testUrl',
      },
      sprites: {
        front_default: 'test_front_default',
        back_default: 'test_back_default',
      },
    };

    getPokemonDataService
      .getPokemonDetails('bulbasaur')
      .subscribe((pokemonDetails) => {
        expect(pokemonDetails).toEqual(dummyPokemonsDetails);
      });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );

    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemonsDetails);

    httpMock.verify();
  });
});
