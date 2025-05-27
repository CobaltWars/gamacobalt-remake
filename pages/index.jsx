import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="py-12">
        <h1 className="text-4xl font-bold mb-6">Bienvenue sur mon portfolio</h1>
        <p className="text-lg mb-8">
          Je suis développeur de jeux et logiciels. Découvrez mes créations!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Jeux"
            description="Mes projets de développement de jeux"
            link="/jeux"
          />
          <Card
            title="Logiciels"
            description="Mes applications et outils"
            link="/logiciels"
          />
          <Card
            title="GLDF"
            description="Espace communautaire"
            link="/gldf"
          />
        </div>
      </section>
    </Layout>
  );
}

function Card({ title, description, link }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <a href={link} className="text-blue-500 hover:underline">
        Voir plus →
      </a>
    </div>
  );
}