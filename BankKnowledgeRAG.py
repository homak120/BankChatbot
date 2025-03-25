import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
            relevant_docs.append((filenames[idx], documents[idx], sim))
    return relevant_docs

def main():
    # Specify the directory where your account detail text files are stored.
    directory = "RAG_DataSource"  # Make sure this directory exists and contains your .txt files.
    documents, filenames = load_documents(directory)
    
    if not documents:
        print("No text files found in the directory:", directory)
        return
    
    # Get user input query
    user_query = input("Enter your query: ")
    
    # Retrieve relevant documents based on the query
    relevant_docs = retrieve_relevant_docs(user_query, documents, filenames, threshold=0.1)
    
    if not relevant_docs:
        print("No relevant documents found.")
    else:
        print("\nRelevant documents found:\n")
        for filename, text, sim in relevant_docs:
            print(f"Filename: {filename}")
            print(f"Similarity Score: {sim:.4f}")
            print("Content:")
            print(text)
            print("\n" + "-"*40 + "\n")

if __name__ == "__main__":
    main()
