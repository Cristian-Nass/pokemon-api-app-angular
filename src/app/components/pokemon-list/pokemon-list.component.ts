import { Component } from '@angular/core';
import { GetPokemonDataService } from 'src/app/services/get-pokemon-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonsListType } from '../../types/types';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  constructor(
    private getPokemonDataService: GetPokemonDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  interval = 10;
  localOffset = 0;
  localLimit = 10;
  buttonOff = true;

  loadedData: PokemonsListType = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  loading = false;

  ngOnInit() {
    this.getPokemonData(this.localOffset, this.localLimit);
  }

  getPokemonData(offset: number, limit: number) {
    this.loading = true;
    this.getPokemonDataService
      .getPokemonsList(offset, limit)
      .subscribe((resData) => {
        this.loadedData = resData as PokemonsListType;
        this.loading = false;
      });
  }

  next() {
    this.localOffset += this.interval;
    this.getPokemonData(this.localOffset, this.localLimit);
  }

  previous() {
    this.localOffset -= this.interval;
    this.getPokemonData(this.localOffset, this.localLimit);
  }

  pokemonDetails(name: string) {
    this.router.navigate([name], { relativeTo: this.activatedRoute });
  }
}
