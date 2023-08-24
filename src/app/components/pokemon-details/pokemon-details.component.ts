import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetPokemonDataService } from 'src/app/services/get-pokemon-data.service';
import { PokemonDetailsType } from '../../types/types';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent {
  pokemonName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private getPokemonDataService: GetPokemonDataService,
    private router: Router,
    public bookmarkService: BookmarkService
  ) {}

  pockemonDetails: PokemonDetailsType = {
    id: 0,
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    species: {
      name: '',
      url: '',
    },
    sprites: {
      front_default: '',
      back_default: '',
    },
  };

  ngOnInit() {
    this.pokemonName = this.activatedRoute.snapshot.params['name'];
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pokemonName = params['name'];
    });
    this.getPokemonDetails(this.pokemonName);
  }

  getPokemonDetails(name: string) {
    this.getPokemonDataService.getPokemonDetails(name).subscribe((resData) => {
      this.pockemonDetails = resData as PokemonDetailsType;
    });
  }

  pokemonEvolution(id: number) {
    this.router.navigate(['pokemon-evolution', id], {
      relativeTo: this.activatedRoute,
    });
  }

  moveToBackPage() {
    this.router.navigate(['/pokemon-list']);
  }
}
