namespace ParcelOpedia.Utility
{
    public static class KeyGenerator
    {
        public static string GenerateJwtSecretKey()
        {
            using (var rng = new System.Security.Cryptography.HMACSHA256())
            {
                var key = rng.Key;
                return Convert.ToBase64String(key);
            }
        }
    }
}
