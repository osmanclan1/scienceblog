---
id: ai-ml-basics
name: AI / ML Basics
description: Understanding the fundamentals of artificial intelligence and machine learning, including neural networks, weights, biases, and the training process
---

# AI / ML Basics

AI / ML Models are mainly built off of something called neural networks. Neural networks are machine learning models which stack digital versions of neurons in layers and learns pattern-recognizing weights and biases from data to map inputs to outputs.

Now that may be confusing so lets give an example, spam detection. An email is fed into the network, and features such as words or phrases like "prize," "money," "dear" or "win" are used as inputs. The early neurons in the network process the importance of each detail, while later layers combine this information into higher-level cues that capture context and tone (like a random congratulations award). The final layer then computes a probability of whether the email is spam, and if that probability is high enough, the email is flagged.

## Weights

Weights determine how much influence a specific input has on the final decision. Think of them as the importance or strength assigned to each word. 

**High Weight**: If the word "Jackpot" appears, the network might give it a high weight, strongly pushing the email toward the "Spam" category. 

**Low Weight**: A common word like "The" would have a weight near zero because it doesn't help distinguish between a normal email and spam.

## Biases (Inclination)

A bias is a baseline setting that determines how easy or hard it is for a neuron to "fire." It represents the model's overall tendency or threshold before it sees any specific evidence. It is similar to having an assumption.

**Strict Bias**: A low bias, this means even if the word "Money" (high weight) appears once, the bias holds the neuron back, requiring more spammy words to trigger a "Spam" alert.

**Lenient Bias**: If the bias is high, the model is "trigger-happy" and might flag emails as spam even if they only contain a few mildly suspicious words.

## Data Representation

When it comes to AI/ML Models, every input (like an image or word) is converted into a list of numbers (a vector).

## The Dot Product

The network processes this data by performing matrix multiplications. It multiplies inputs by weights and adds biases. This can be represented mathematically as **y = wx + b**. Where y is output, x is input, w is weights and b is bias. This formula is called linear regression.

## Loss Function

A Loss Function (or Cost Function) calculates the distance between the model's prediction and the actual correct answer. The mathematical goal of training is to find the values for w and b that makes this loss as close to zero as possible.

## Finding Direction (Calculus)

If you are at the top of a mountain (high error) and want to get to the valley (low error) in the fog, you feel the slope of the ground under your feet to know which way is "down."

### The Gradient

In calculus, the derivative tells you the slope of a function at a specific point. For a model with billions of parameters, we calculate partial derivatives (the gradient) to determine how much changing each individual weight will affect the total error.

## Gradient Descent

Once the model knows which direction reduces error, it takes a small step in that direction. This is called Gradient Descent. The model updates its weights using the formula:

**New weight = Old weight - (Learning Rate (step size) * Gradient)**

By repeating this process thousands or millions of times, the model gradually descends to the point of minimum error, effectively learning the patterns in the data.



