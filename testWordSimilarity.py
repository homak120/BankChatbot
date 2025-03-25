import gensim.downloader as api
from numpy import dot
from numpy.linalg import norm

# Load the pre-trained model (this may take a minute)
model = api.load("word2vec-google-news-300")  # Pre-trained on Google News

# Extract vectors for the words "begin" and "start"
vec_begin = model['begin']
vec_start = model['start']

# For demonstration, print the first 10 elements of each vector
print("Vector for 'begin' (first 10 dims):", vec_begin[:10])
print("Vector for 'start' (first 10 dims):", vec_start[:10])

# Compute cosine similarity between the two vectors
cosine_sim = dot(vec_begin, vec_start) / (norm(vec_begin) * norm(vec_start))
print("Cosine similarity between 'begin' and 'start':", cosine_sim)

