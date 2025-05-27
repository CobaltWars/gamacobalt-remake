import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {project.imageBase64 && (
        <img 
          src={project.imageBase64} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        <Link
          href={`/gldf/${project.id}`}
          className="text-blue-500 hover:underline"
        >
          Voir le projet →
        </Link>
      </div>
    </div>
  );
}