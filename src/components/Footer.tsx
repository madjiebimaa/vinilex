export default function Footer() {
  return (
    <footer className="grid place-content-center p-4 mt-auto">
      <p className="font-mono text-sm md:text-base text-center">
        Colors from{' '}
        <a
          href="https://nipsea.group"
          target="_blank"
          className="font-semibold underline"
        >
          Nippon Paint
        </a>
        <span className="mx-2">&#183;</span>
        Made by{' '}
        <a
          href="https://github.com/madjiebimaa"
          target="_blank"
          className="font-semibold underline"
        >
          Muhammad Adjie Bimaditya
        </a>
        .
      </p>
    </footer>
  );
}
