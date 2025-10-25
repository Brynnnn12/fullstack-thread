export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Threads Forum</h3>
            <p className="text-gray-600 text-sm">
              Platform diskusi modern untuk komunitas yang aktif dan terlibat.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="hover:text-blue-600 transition-colors"
                >
                  Profil
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="hover:text-blue-600 transition-colors"
                >
                  Masuk
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Kontak</h4>
            <p className="text-gray-600 text-sm">
              Punya pertanyaan? Hubungi kami di{" "}
              <a
                href="mailto:support@threadsforum.com"
                className="text-blue-600 hover:underline"
              >
                support@threadsforum.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2025 Threads Forum. Dibuat dengan ❤️ menggunakan Next.js</p>
        </div>
      </div>
    </footer>
  );
}
