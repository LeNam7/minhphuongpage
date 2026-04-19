import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/Minh_Phuong_Company_Profile.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="HoSoNangLuc_MinhPhuong.pdf"',
          },
        ],
      },
    ];
  },
};
 
export default withNextIntl(nextConfig);
