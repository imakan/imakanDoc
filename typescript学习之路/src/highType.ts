interface Person {
    name: string;
    age?: number;
}

type P = Partial<Person>
type p1 = Required<Person>
type p2 = Pick<Person, 'name'>
type p3 = Omit<Person, 'name'>
type p4 = Record<'name', Person>