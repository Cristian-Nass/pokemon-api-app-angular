interface PokemonDataType {
  name: string;
  url: string;
  imageUrl?: string;
}

export interface PokemonsListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDataType[];
}
interface PokemonAbilities {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailsType {
  id: number;
  name: string;
  abilities: PokemonAbilities[];
  height: number;
  weight: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
    back_default: string;
  };
}
interface EvolutionDetailsType {
  gender: null | string;
  held_item: null | string;
  item: null | string;
  known_move: null | string;
  known_move_type: null | string;
  location: null | string;
  min_affection: null | string;
  min_beauty: null | string;
  min_happiness: null | string;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null | string;
  party_type: null | string;
  relative_physical_stats: null | string;
  time_of_day: string;
  trade_species: null | string;
  trigger: PokemonDataType;
  turn_upside_down: boolean;
}

interface EevolvesToType {
  evolution_details: EvolutionDetailsType[];
  evolves_to: [];
  is_baby: boolean;
  species: PokemonDataType;
}

interface ChainEvolutionType {
  evolution_details: [];
  evolves_to: EevolvesToType[];
  is_baby: boolean;
  species: PokemonDataType;
}

export interface PokemonEvolutionType {
  baby_trigger_item: PokemonDataType | null;
  chain: ChainEvolutionType;
  id: number;
}
