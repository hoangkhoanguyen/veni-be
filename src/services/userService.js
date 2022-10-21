// import { hash } from 'bcryptjs'
import bcrypt from "bcryptjs/dist/bcrypt";
import aplicationDB from "../models/index";
import tokenService from "../services/tokenService";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  try {
    const { username, password, firstName, lastName, rePassword } = data;
    if (!username || !password || !firstName || !lastName || !rePassword)
      return {
        errCode: 1,
        errMsg: "Missing input parameters!",
      };
    if (password !== rePassword)
      return {
        errCode: 1,
        errMsg: "Passwords don't match each other!",
      };
    let user = await aplicationDB.User.findOne({
      where: { username: data.username },
    });
    if (user)
      return {
        errCode: 1,
        errMsg: "Please choose another username!",
      };
    let hash = await bcrypt.hashSync(data.password, salt);
    await aplicationDB.User.create({
      username: data.username,
      password: hash,
      firstName: data.firstName,
      lastName: data.lastName,
      isLinkedGoogle: false,
      isLinkedFacebook: false,
    });
    return {
      errCode: 0,
      message: "Successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: "Error server!",
    };
  }
};

const updateInfo = async (data) => {
  try {
    await aplicationDB.User.update(
      {
        phoneNumber: data.phoneNumber,
        address: data.address,
      },
      { where: { username: data.username } }
    );
    return {
      errCode: 0,
      errMsg: "Update successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: "Error server!",
    };
  }
};

const login = async (data) => {
  try {
    let user = await aplicationDB.User.findOne({
      where: { username: data.username },
      raw: true,
    });
    if (user) {
      let isValid = await bcrypt.compareSync(data.password, user.password);
      if (isValid) {
        let token = tokenService.createJWT(data.username);
        let refreshToken = await tokenService.createNewRefreshToken(user.id);
        if (!token || !refreshToken) {
          return {
            errCode: -1,
            errMsg: "Error server!",
          };
        }
        delete user.password;
        return {
          errCode: 0,
          data: {
            ...user,
            accessToken: token,
            refreshToken,
          },
        };
      }
      return {
        errCode: 3,
        errMsg: "Wrong password!",
      };
    }
    return {
      errCode: 1,
      errMsg: `Please check your username!`,
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: `Error server!`,
    };
  }
};

const loginWithGoogle = async (email) => {
  try {
    let user = await aplicationDB.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return {
        errCode: 1,
        errMsg: "This Google account haven't been registered yet!",
      };
    }

    let token = tokenService.createJWT(user.username);
    let refreshToken = await tokenService.createNewRefreshToken(user.id);
    if (!token || !refreshToken) {
      return {
        errCode: -1,
        errMsg: "Error server!",
      };
    }

    delete user.password;

    return {
      errCode: 0,
      data: {
        ...user,
        accessToken: token,
        refreshToken,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: `Error server!`,
    };
  }
};

const loginWithFacebook = async (email) => {
  try {
    let user = await aplicationDB.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return {
        errCode: 1,
        errMsg: "This Facebook account haven't been registered yet!",
      };
    }

    let token = tokenService.createJWT(user.username);
    let refreshToken = await tokenService.createNewRefreshToken(user.id);
    if (!token || !refreshToken) {
      return {
        errCode: -1,
        errMsg: "Error server!",
      };
    }

    delete user.password;

    return {
      errCode: 0,
      data: {
        ...user,
        accessToken: token,
        refreshToken,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: `Error server!`,
    };
  }
};

const linkToGoogle = async (data) => {
  try {
    const { email, family_name, given_name, picture, username } = data;
    await aplicationDB.User.update(
      {
        email,
        firstName: given_name,
        lastName: family_name,
        image: picture,
        isLinkedGoogle: true,
      },
      { where: { username } }
    );
    let result = await aplicationDB.User.findOne({
      where: { username },
      raw: true,
    });
    delete result.password;
    return {
      errCode: 0,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: "Error server!",
    };
  }
};

const linkToFacebook = async (data) => {
  try {
    const { email, first_name, last_name, picture, username } = data;
    let user = await aplicationDB.User.findOne({ where: { username } });
    if (user?.isLinkedGoogle || user?.isLinkedFacebook) {
      return {
        errCode: 2,
        errMsg: "Your account is linked by another account!",
      };
    }
    await aplicationDB.User.update(
      {
        email,
        firstName: first_name,
        lastName: last_name,
        image: picture,
        isLinkedFacebook: true,
      },
      { where: { username } }
    );
    let result = await aplicationDB.User.findOne({
      where: { username },
      raw: true,
    });
    delete result.password;
    return {
      errCode: 0,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      errCode: -1,
      errMsg: "Error server!",
    };
  }
};

module.exports = {
  createNewUser,
  login,
  linkToGoogle,
  loginWithGoogle,
  updateInfo,
  linkToFacebook,
  loginWithFacebook,
};
