from flask import Flask, request, jsonify
from bankKnowledgeRAGUtil import DocumentLoader, retrieve_relevant_docs

app = Flask(__name__)


@app.route('/retrieveAdditionalKnowledge', methods=['GET'])
def retrieve_additional_knowledge():
    user_query = request.args.get('userQuery')
    if not user_query:
        return jsonify({'error': 'Missing userQuery parameter'}), 400
    
    directory = "RAG_DataSource"  # Make sure this directory exists and contains your .txt files.
    document_loader = DocumentLoader(directory)
    documents, filenames = document_loader.documents, document_loader.filenames

    relevant_docs = retrieve_relevant_docs(user_query, documents, filenames, threshold=0.1)
    
    return jsonify({'listOfAdditionalKnowledge': relevant_docs})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5567)
