/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental:{
        serverActions:true,
        mdxRs:true,
        serverComponentsExternalPackages:['mongoose']
    }
};

export default nextConfig;
module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        "mongodb-client-encryption": false ,
        "aws4": false
      };
  
      return config;
    }
}