import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetPokemonDataService } from 'src/app/services/get-pokemon-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css'],
})
export class PokemonEvolutionComponent {
  pokemonId = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private getPokemonDataService: GetPokemonDataService,
    private location: Location
  ) {}

  pockemonEvolution = {
    id: 0,
    minLevel: 0,
    species: '',
  };

  ngOnInit() {
    this.pokemonId = this.activatedRoute.snapshot.params['id'];
    this.getPokemonhttpsEvolution(this.pokemonId);
  }

  getPokemonhttpsEvolution(id: number) {
    this.getPokemonDataService.getPokemonEvolution(id).subscribe((resData) => {
      this.pockemonEvolution.id = resData.id;
      this.pockemonEvolution.minLevel =
        resData.chain.evolves_to[0].evolution_details[0].min_level;
      this.pockemonEvolution.species = resData.chain.species.name;
    });
  }

  oneStepBack() {
    this.location.back();
  }
}
