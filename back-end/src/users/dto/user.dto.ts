export class CreateUserDto {
  name: string;
  age: number;
  sex: string;
  description: string;
  jobTitle: string;
  studies: string[];
  interests: string[];
  notes: string;
}

export class UpdateUserDto {
  name: string;
  age: number;
  sex: string;
  description: string;
  jobTitle: string;
  studies: string[];
  interests: string[];
  notes: string;
}
