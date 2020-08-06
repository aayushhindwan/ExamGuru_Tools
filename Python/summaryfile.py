import nltk
import sys
import re
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize,sent_tokenize
from nltk.corpus import stopwords

def freq(words):
    dict_words={}
    for i in words :
        if i in dict_words :
            dict_words[i]+=1
        else:
            dict_words[i]=1
            
    return dict_words   
def pos_tagging(text):
  pos_tag=nltk.pos_tag(text.split)
  pos_tagged_with_noun_verb=[]
  for word,tag in pos_tag :
      if tag == "NN" or tag == "NNP" or tag == "NNS" or tag == "VB" or tag == "VBD" or tag == "VBG" or tag == "VBN" or tag == "VBP" or tag == "VBZ":
          pos_tagged_with_noun_verb.append(word)
  return pos_tagged_with_noun_verb  

def TFIDF(word,sentences,dict_freq,sentence) :
    return 0


def sentence_score(sentence,sentences,dict_freq):
    sent_score=0
    regex = r'[^a-zA-Z0-9\s]'
    sentence = re.sub(regex,'',sentence)
    sentence = re.sub(r'\d+', '', sentence)
    pos_tagged_sentence= []
    pos_tagged_sentence=pos_tagging(sentence)
    for word in pos_tagged_sentence :
        if word not in Stopwords and len(word)>1 :
         sent_score+= TFIDF(word,sentences,dict_freq,sentence)
    return sent_score


Stopwords=set(stopwords.words('english'))
wordLemmatizer=WordNetLemmatizer()
#text=sys.argv[1]
text="my name is my  aayush"
tokenized_sentences=sent_tokenize(text)
#for removing special chars
regex = r'[^a-zA-Z0-9\s]'
text = re.sub(regex,'',text)
text=re.sub(r'\d+',"",text)
tokenized_words_with_stopwords = word_tokenize(text)
tokenized_words = [word for word in tokenized_words_with_stopwords if word not in Stopwords]
tokenized_words = [word for word in tokenized_words if len(word) > 1]
tokenized_words = [word.lower() for word in tokenized_words]
tokenized_words = lemmatize_words(tokenized_words)
word_freq = freq(tokenized_words)
input_user = int(input('Percentage of information to retain(in percent):'))
no_of_sentences = int((input_user * len(tokenized_sentence))/100)
print(no_of_sentences)
c = 1
sentence_with_importance = {}
for sent in tokenized_sentence:
    sentenceimp = sentence_importance(sent,word_freq,tokenized_sentence)
    sentence_with_importance[c] = sentenceimp
    c = c+1
sentence_with_importance = sorted(sentence_with_importance.items(), key=operator.itemgetter(1),reverse=True)
cnt = 0
summary = []
sentence_no = []
for word_prob in sentence_with_importance:
    if cnt < no_of_sentences:
        sentence_no.append(word_prob[0])
        cnt = cnt+1
    else:
      break
sentence_no.sort()
cnt = 1
for sentence in tokenized_sentence:
    if cnt in sentence_no:
       summary.append(sentence)
    cnt = cnt+1
summary = " ".join(summary)
print("\n")
print("Summary:")
print(summary)
