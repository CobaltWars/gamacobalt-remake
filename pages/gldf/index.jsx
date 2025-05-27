import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";

export default function GLDF() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const projectsData = [];
      snapshot.forEach((childSnapshot) => {
        projectsData.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      // Tri par date de création
      projectsData.sort((a, b) => b.createdAt - a.createdAt);
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Projets Communautaires</h1>
        
        <div className="mb-8">
          <a
            href="/gldf/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Créer un projet
          </a>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : projects.length === 0 ? (
          <p>Aucun projet partagé pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}