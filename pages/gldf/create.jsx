import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../lib/firebase";
import { ref, push, set } from "firebase/database"; // Nouveaux imports
import Layout from "../../components/Layout";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Stocke l'image en Base64
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newProjectRef = push(ref(db, 'projects'));
      await set(newProjectRef, {
        title,
        description,
        imageBase64, // Stocké directement dans la base de données
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: Date.now(),
      });

      router.push("/gldf");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Créer un projet</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Image (optionnelle)</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            {imageBase64 && (
              <div className="mt-2">
                <img 
                  src={imageBase64} 
                  alt="Aperçu" 
                  className="max-h-40 rounded"
                />
              </div>
            )}
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? "Publication..." : "Publier le projet"}
          </button>
        </form>
      </div>
    </Layout>
  );
}