import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Singleton to load documents and filenames only once
class DocumentLoader:
    _instance = None

    def __new__(cls, directory):
        if cls._instance is None:
            cls._instance = super(DocumentLoader, cls).__new__(cls)
            cls._instance.documents, cls._instance.filenames = load_documents(directory)
        return cls._instance

def load_documents(directory):
    """
    Loads all .txt files from the specified directory.
    
    Returns:
        documents (list of str): The content of each file.
        filenames (list of str): The corresponding file names.
    """
    documents = []
    filenames = []
    # Iterate over each file in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                text = f.read()
            documents.append(text)
            filenames.append(filename)
    return documents, filenames

def retrieve_relevant_docs(user_query, documents, filenames, threshold=0.1):
    """
    Given a user query, computes the TF-IDF vectors for the documents and the query.
    Then calculates the cosine similarity and returns the documents with a similarity above the threshold.
    
    Args:
        user_query (str): The user's query.
        documents (list of str): The list of document texts.
        filenames (list of str): The corresponding file names.
        threshold (float): The similarity threshold for a document to be considered relevant.
        
    Returns:
        relevant_docs (list of tuples): Each tuple contains (filename, document text, similarity score).
    """
    vectorizer = TfidfVectorizer()
    # Fit vectorizer on all documents and transform them into TF-IDF vectors
    doc_vectors = vectorizer.fit_transform(documents)
    # Transform the user query into the same TF-IDF vector space
    query_vector = vectorizer.transform([user_query])
    # Compute cosine similarity between the query and each document vector
    similarities = cosine_similarity(query_vector, doc_vectors)[0]
    
    relevant_docs = []
    # Check each document's similarity against the threshold
    for idx, sim in enumerate(similarities):
        print(f"Filename: {filenames[idx]}, Similarity: {sim:.4f}")  # Debugging line
        if sim >= threshold:
            #relevant_docs.append((filenames[idx], documents[idx], sim))
            relevant_docs.append({"filename": filenames[idx], "text": documents[idx], "similarity": sim}) 
    return relevant_docs
