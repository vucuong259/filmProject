class AppConfig {
  get port(): number {
    return parseInt(process.env.PORT) || 2607;
  }

  get mongooseConfig() {
    return {
      uri: process.env.MONGO_URL,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  get jwtConfig() {
    return {
      secretKey: process.env.JWT_SECRET_KEY,
      expiresIn: parseInt(process.env.JWT_EXPIRATION),
    };
  }
}

export const appConfig = new AppConfig();
