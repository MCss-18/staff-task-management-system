import { hashPassword } from "../../common/utils/handleBcrypt.js";
import { pool } from "../../database/database.js";
import { UserModel } from "../../database/models/user.model.js";

export class UserService {
  constructor() {
    this.userModel = new UserModel();
  }

  async getPaginatedUsers(limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.userModel.getPaginatedUsers(connection, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getPaginatedUsers: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTotalPageUsers(search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.userModel.getTotalPageUsers(connection, search);
    } catch (error) {
      console.error("Error SV - getTotalPageUsers: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getUsers() {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.userModel.getUsers(connection, search);
    } catch (error) {
      console.error("Error SV - getUsers: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }

  }

  async getUserById(userId) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.userModel.getUserById(connection, userId)
    } catch (error) {
      console.error("Error SV - getUserById: ", error);
      throw error
    } finally {
      if (connection) {
        connection.release()
      } 
    }

  }

  async createUser(userData) {

    let connection;
    try {
      connection = await pool.getConnection();
      const {username, email, password} = userData

      // validate email
      const isUsernameValid = await this.validateUsername(connection, username);
      if (!isUsernameValid) {
        const error = new Error("El usuario ya está registrado");
        error.statusCode = 400;
        throw error;
      }

      // validate email
      if (email){
        const isEmailValid = await this.validateEmail(connection, email);
        if (!isEmailValid) {
          const error = new Error("El correo ya está registrado");
          error.statusCode = 400;
          throw error;
        }
      }

      // Validate password
      // const validationErrors = validatePassword(password);
      // if (validationErrors) {
      //   throw new Error(validationErrors.join(" "));
      // }

      // encrypt password
      userData.password = await hashPassword(password);
      // create user
      return await this.userModel.createUser(connection, userData)
    } catch (error) {
      console.log("Error SV - createUserService: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async updateUser(userId, userData) {
    let connection;
    try {
      connection = await pool.getConnection();
      const {username, email, password} = userData

      // validate email
      const isUsernameValid = await this.validateUsername(connection, username, userId);
      if (!isUsernameValid) {
        const error = new Error("El usuario ya está registrado");
        error.statusCode = 400;
        throw error;
      }

      // validate email
      const isEmailValid = await this.validateEmail(connection, email, userId);
      if (!isEmailValid) {
        const error = new Error("El correo ya está registrado");
        error.statusCode = 400;
        throw error;
      }

      if (password) {
        userData.password = await hashPassword(password);
      }

      return await this.userModel.updateUser(connection, userId, userData);
    } catch (error) {
      console.error("Error SV - updateUser: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

  async getUserByUsername(username) {
    let connection
    try {
      connection = await pool.getConnection();
      
      return await this.userModel.getUserByUsername(connection, username);

    } catch (error) {
      console.log("Error SV - getUserByUsername: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  // async getUserByEmail(email) {
  //   let connection
  //   try {
  //     connection = await pool.getConnection();
      
  //     return await this.userModel.getUserByEmail(connection, email);

  //   } catch (error) {
  //     console.log("Error SV - getUserByEmail: ", error)
  //     throw error
  //   } finally {
  //     if (connection) {
  //       connection.release()
  //     }
  //   }
  // }

  // helper functions
  async validateEmail(connection, email, userId=null) {
    try {
      const existingUser = await this.userModel.getUserByEmail(connection, email, userId);
      return existingUser.length === 0;
    } catch (error) {
      console.log("Error SV - validating email: ", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // helper functions
  async validateUsername(connection, email, userId=null) {
    try {
      const existingUser = await this.userModel.getUserByUsername(connection, email, userId);
      return existingUser.length === 0;
    } catch (error) {
      console.log("Error SV - validating username: ", error);
      throw error;
    } finally {
      connection.release();
    }
  }

}
