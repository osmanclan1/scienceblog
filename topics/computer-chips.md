---
id: computer-chips
name: Computer Chips
description: Understanding the fundamental principles of computer chips, from electricity and bits to transistors, logic gates, and the difference between CPUs and GPUs
quiz:
  questions:
    - question: "In computer chips, what does a current flowing represent?"
      type: "multiple-choice"
      options:
        - "0"
        - "1"
        - "Both 0 and 1"
        - "Nothing"
      correctAnswer: "1"
      explanation: "In computer chips, a current flowing represents 1 (binary on), while no current flowing represents 0 (binary off). This is the fundamental basis of bits."
    - question: "What is a semiconductor?"
      type: "multiple-choice"
      options:
        - "A material that only allows electricity to flow"
        - "A material that only blocks electricity"
        - "A material that combines both the ability to allow and block electricity"
        - "A type of logic gate"
      correctAnswer: "A material that combines both the ability to allow and block electricity"
      explanation: "Semiconductors like silicon combine both abilities - they can allow electricity to flow or block it. This is crucial for the core idea of bits (0s and 1s)."
    - question: "What is the primary function of a transistor?"
      type: "multiple-choice"
      options:
        - "To store data permanently"
        - "To act as a microscopic electronic switch that can allow or block current flow"
        - "To generate electricity"
        - "To connect multiple chips together"
      correctAnswer: "To act as a microscopic electronic switch that can allow or block current flow"
      explanation: "Transistors function as microscopic electronic switches. By applying a voltage to one side, you can either allow a current to flow or block it, which is fundamental to how chips work."
    - question: "What is the main difference between a CPU and a GPU?"
      type: "multiple-choice"
      options:
        - "CPUs are faster than GPUs"
        - "CPUs have many cores for parallel processing, while GPUs have few powerful cores"
        - "CPUs have few but powerful cores for complex logic, while GPUs have many cores for parallel repetitive tasks"
        - "There is no difference"
      correctAnswer: "CPUs have few but powerful cores for complex logic, while GPUs have many cores for parallel repetitive tasks"
      explanation: "CPUs contain few but powerful cores that work sequentially to handle complex operations like databases. GPUs feature many cores designed to perform many repetitive tasks simultaneously, like doing math or rendering pixels."
---

# Computer Chips

To give some background knowledge before we begin with disassembling the first principles of a computer chip lets begin by talking about the most foundational aspect to a computer chip is electricity. With electricity you get the basis of bits which is the language of all traditional devices we have today. A current flowing represents 1 and no current flowing represents 0. Bits can form together to represent letters, numbers, and other data types.

## The Physical Foundation: Semiconductors

Conductors are materials that allow electricity to flow and insulators block electricity. Semiconductors like silicon combine both of these abilities which is crucial to the core idea of bits (0s and 1s) as explained before.

## Transistors

Transistors function as a microscopic electronic switch, by applying a voltage to one side of the transistor you can either allow a current to flow or block it. When you arrange a few transistors in specific patterns you get Logic Gates. Basic Logic Gates take two input wires to produce one output. These gates allow a chip to make simple decisions.

### Logic Gates

**AND Gate**: Only outputs 1 if both inputs are 1.

**OR Gate**: Outputs a 1 if either are 1

**NOT Gate**: Outputs reverse (if input is 1 output is 0 and vice versa)

**XOR Gate**: Output 1 only if exactly one input is 1.

## Building Circuits

When you chain these gates together you can build circuits that perform math or store data. For instance, Adders are a combination of gates (XOR and AND) that can add two binary numbers together, producing a sum and a carry-over bit (much like carry-on in simple addition). Say we want to find out what is the sum of 1 + 1.

**Input**: You send a voltage (binary 1) into both input wires say A and B (these are our numbers we are adding).

**Sum**: Using an XOR gate the output of these inputs would be 0 since A and B inputs are the same.

**Carry**: Using an AND Gate the output of these inputs would be 1 since both A and B are 1.

If we carry over the 1 in our sum. We get 10 which represents 2 in bits.

## Different Roles for Chips

Alright good job for making it this far you now have a basic understanding of a computer chip. Now there are different roles for chips. Here are two main categories:

### CPU

The primary functional component of a computer that acts as the "control center". It is a complex set of electronic circuitry designed to interpret, process, and execute instructions from a system's operating system and applications. It can be referred to as the brain of the computer as it deals with complex logic and decision making. A core is like an independent execution unit; you can think of it as a worker. CPUs contain few but powerful cores that work sequentially to handle the heavy operations of a computer like databases.

### GPU

A specialized electronic circuit designed to accelerate the creation of images and handle complex mathematical calculations rapidly. While originally built for graphics rendering, modern GPUs are defined as massive parallel processors used for AI, machine learning, and high-performance computing. GPU's feature many cores designed to perform many repetitive tasks simultaneously, like doing math or rendering pixels on your screen.



