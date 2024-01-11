export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    name: string;
    bs: string;
    catchPhrase: string;
  };
  website: string;
}
