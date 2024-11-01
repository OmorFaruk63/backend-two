import { use } from "bcrypt/promises.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = asyncHandler(async (req, res) => {
  const { password, email, fullName, username } = req.body;
  if (
    [password, email, fullName, username].some((filed) => filed?.trim() == "")
  ) {
    throw new ApiError(400, "All filed are required");
  }
  const userExists = User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExists) {
    throw new ApiError(409, "User are all ready exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(409, "Avatar is  required");
  }
  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(409, "Avatar is  required");
  }

  const user = await User.create({
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    fullName,
    username: username.toLowerCase(),
  });

  const userCheck = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCheck) {
    throw new ApiError(500, "User not created");
  }

  res
    .status(200)
    .json(new ApiResponse(200, userCheck, "User created successfully"));
});
export { register };
