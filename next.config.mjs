import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/Ho_So_Cong_Ty_Minh_Phuong.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Ho_So_Cong_Ty_Minh_Phuong.pdf"',
          },
        ],
      },
    ];
  },
};
 
export default withNextIntl(nextConfig);
