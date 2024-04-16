export interface ReplikaUnit {
  unitClass: string;
  image: string;
  aliases: string;
  affiliation: string;
  occupation: string;
  species: string;
  gender: string;
  height: number;
  editColumn?: string;
}

export interface GestaltUnit {
  name: string;
  image: string;
  pkz: string;
  occupation: string;
  birthDate: string;
  birthPlace: string;
  species: string;
  gender: string;
}
