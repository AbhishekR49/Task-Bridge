const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refreshTokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },

    // Immediately previous refresh token
    previousRefreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },

    // When the previous token was rotated
    previousTokenRotatedAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.index({ userId: 1 });

sessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;