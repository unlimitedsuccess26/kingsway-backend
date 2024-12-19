import { IAdminUserInput } from "./interface";
import Admin from "./entity";


class AdminService {
  public async createAdmin(input: IAdminUserInput) {
    const { password, userName } = input

    const admin = new Admin({
      password, userName
    });

    const adminData = await admin.save();

    return adminData;
  }

  public async findAdminByUserNameAndPassword(input: IAdminUserInput) {
    const { password, userName } = input
    
    const admin = await Admin.findOne({ userName, password }).select("-password");
    return admin;
  }


}

export const adminService = new AdminService();
