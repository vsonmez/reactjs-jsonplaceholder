import TUserAddress from "./user-address.type";
import TUserCompany from "./user.company.type";

type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: TUserAddress;
  phone: string;
  website: string;
  company: TUserCompany;
};
export default TUser;
