/* jshint indent: 2 */
import crypto from "crypto"
import jwt from "jsonwebtoken"
const { QueryTypes } = require('sequelize');
import { getSearchSql } from "../sql";


module.exports = function (sequelize, DataTypes) {
  const USER = sequelize.define('USER', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    phone_num: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    profile_img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    rank: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'bronze'
    },
    coupon: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    bank_account: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    credit_card: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'USER'
  });

  USER.hash = function (password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, process.env.SECRET_KEY, 92412, 64, 'sha512', async (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            key.toString('base64')
          )
        }
      })
    })
  }

  USER.prototype.verify = async function (password) {
    const hash = await USER.hash(password);
    return this.dataValues.password === hash;
  };

  USER.prototype.getToken = function () {
    return jwt.sign(
      { email: this.dataValues.email },
      process.env.JWT_KEY,
      { expiresIn: '2h' }
    )
  }

  USER.save = async function (user, platform_type, auth) {
    try {
      const {
        email, phone, password, name, nickname, gender, profile_url, about
      } = user;


      if (platform_type == "local") {
        const hash = await users.hash(password);
        const new_user = await this.create({
          email,
          platform_type,
          phone,
          password: hash,
          name,
          nickname,
          gender,
          auth: auth || 0,
          profile_url,
          about
        })
        return new_user;
      } else {
        const new_user = await this.create({
          email,
          platform_type,
          phone,
          password,
          name,
          nickname,
          gender,
          auth: auth || 0,
          profile_url,
          about
        })
        return new_user;
      }


    } catch (err) {
      console.log(err)
      return false;
    }
  }

  // 사용자를 follower로 지정한 유저들 반환
  USER.read_following_user = function (signin_user_email) {
    let sql = " SELECT * FROM USER_AND_USER as uu \
	                LEFT JOIN USER as u ON uu.following_email = u.email \
                  WHERE uu.follower_email = '" + signin_user_email + "'";

    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  // 사용자가 follower로 지정한 유저들 반환
  USER.read_folloer_user = function (signin_user_email) {
    let sql = " SELECT * FROM USER_AND_USER as uu \
    LEFT JOIN USER as u ON uu.follower_email = u.email \
    WHERE uu.following_email = '" + signin_user_email + "'";

    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }
  return USER;
};
