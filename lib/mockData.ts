// ─── Lecture Summaries ────────────────────────────────────────────────────────

export interface LectureSummary {
  id: number;
  title: string;
  summary: string;
  keyTopics: string[];
  importance: "High" | "Medium" | "Low";
  duration: string;
  lectureNumber: string;
}

export const lectureSummaries: LectureSummary[] = [
  {
    id: 1,
    lectureNumber: "01",
    title: "Introduction to Artificial Intelligence",
    summary:
      "This lecture introduces the concept of Artificial Intelligence, its goals, applications, and major branches. It covers the historical context of AI development and establishes foundational vocabulary that will be used throughout the course.",
    keyTopics: [
      "Definition of AI",
      "Intelligent agents",
      "Real-world applications",
      "Difference between AI, ML, and Deep Learning",
      "History of AI research",
    ],
    importance: "High",
    duration: "52 min",
  },
  {
    id: 2,
    lectureNumber: "02",
    title: "Search Algorithms",
    summary:
      "This lecture explains problem-solving using search strategies such as BFS, DFS, and heuristic-based search. Emphasis is placed on understanding the state space representation and the trade-offs between completeness, optimality, and computational cost.",
    keyTopics: [
      "State space representation",
      "Breadth First Search (BFS)",
      "Depth First Search (DFS)",
      "A* Search",
      "Heuristic functions",
    ],
    importance: "High",
    duration: "61 min",
  },
  {
    id: 3,
    lectureNumber: "03",
    title: "Machine Learning Basics",
    summary:
      "This lecture covers the basic concepts of machine learning, including supervised and unsupervised learning paradigms. Students learn how models are trained, evaluated, and how to avoid common pitfalls such as overfitting.",
    keyTopics: [
      "Training data and datasets",
      "Features and labels",
      "Classification",
      "Regression",
      "Model evaluation metrics",
    ],
    importance: "Medium",
    duration: "48 min",
  },
  {
    id: 4,
    lectureNumber: "04",
    title: "Neural Networks",
    summary:
      "This lecture introduces artificial neural networks, modeled loosely on biological neurons. Topics include the structure of feedforward networks, the role of weights and biases, and an overview of how backpropagation enables learning.",
    keyTopics: [
      "Artificial neuron model",
      "Weights and biases",
      "Activation functions (ReLU, Sigmoid, Tanh)",
      "Feedforward networks",
      "Backpropagation overview",
    ],
    importance: "High",
    duration: "67 min",
  },
];

// ─── Default Upload Files ─────────────────────────────────────────────────────

export const defaultLectureFiles = [
  "Lecture 01 - Introduction to Artificial Intelligence.pdf",
  "Lecture 02 - Search Algorithms.pdf",
  "Lecture 03 - Machine Learning Basics.pdf",
  "Lecture 04 - Neural Networks.pdf",
];

// ─── Quiz Questions ───────────────────────────────────────────────────────────

export interface QuizOption {
  key: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctKey: string;
  relatedTopic: string;
  lectureRef: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ── Lecture 01: Introduction to AI ──────────────────────────────────────────
  {
    id: 1,
    question: "What is the main goal of Artificial Intelligence?",
    options: [
      { key: "A", text: "To store large amounts of data" },
      { key: "B", text: "To build systems that can perform tasks requiring human-level intelligence" },
      { key: "C", text: "To replace computer hardware components" },
      { key: "D", text: "To design graphical user interfaces" },
    ],
    correctKey: "B",
    relatedTopic: "Definition of AI",
    lectureRef: "Lecture 01",
  },
  {
    id: 2,
    question: "Which of the following best describes a 'rational agent' in AI?",
    options: [
      { key: "A", text: "An agent that acts randomly" },
      { key: "B", text: "An agent that only follows pre-programmed rules" },
      { key: "C", text: "An agent that acts to achieve the best expected outcome" },
      { key: "D", text: "An agent that never makes mistakes" },
    ],
    correctKey: "C",
    relatedTopic: "Intelligent Agents",
    lectureRef: "Lecture 01",
  },
  {
    id: 3,
    question: "What is the correct relationship between AI, Machine Learning, and Deep Learning?",
    options: [
      { key: "A", text: "They are three completely separate fields with no overlap" },
      { key: "B", text: "Deep Learning ⊂ Machine Learning ⊂ AI" },
      { key: "C", text: "AI ⊂ Machine Learning ⊂ Deep Learning" },
      { key: "D", text: "Machine Learning and Deep Learning are the same thing" },
    ],
    correctKey: "B",
    relatedTopic: "AI vs ML vs Deep Learning",
    lectureRef: "Lecture 01",
  },
  {
    id: 4,
    question: "Which of the following is a real-world application of Artificial Intelligence?",
    options: [
      { key: "A", text: "Spreadsheet formatting" },
      { key: "B", text: "Medical image diagnosis" },
      { key: "C", text: "File compression" },
      { key: "D", text: "Email archiving" },
    ],
    correctKey: "B",
    relatedTopic: "Real-world Applications of AI",
    lectureRef: "Lecture 01",
  },
  {
    id: 5,
    question: "The Turing Test was proposed to evaluate:",
    options: [
      { key: "A", text: "The speed of a computer processor" },
      { key: "B", text: "Whether a machine can exhibit intelligent behavior indistinguishable from a human" },
      { key: "C", text: "The accuracy of a search engine" },
      { key: "D", text: "The storage capacity of a database" },
    ],
    correctKey: "B",
    relatedTopic: "History of AI Research",
    lectureRef: "Lecture 01",
  },

  // ── Lecture 02: Search Algorithms ───────────────────────────────────────────
  {
    id: 6,
    question: "Which search algorithm explores nodes level by level?",
    options: [
      { key: "A", text: "Depth First Search (DFS)" },
      { key: "B", text: "Breadth First Search (BFS)" },
      { key: "C", text: "A* Search" },
      { key: "D", text: "Hill Climbing" },
    ],
    correctKey: "B",
    relatedTopic: "Breadth First Search (BFS)",
    lectureRef: "Lecture 02",
  },
  {
    id: 7,
    question: "Depth First Search (DFS) uses which data structure internally?",
    options: [
      { key: "A", text: "Queue" },
      { key: "B", text: "Heap" },
      { key: "C", text: "Stack" },
      { key: "D", text: "Hash Table" },
    ],
    correctKey: "C",
    relatedTopic: "Depth First Search (DFS)",
    lectureRef: "Lecture 02",
  },
  {
    id: 8,
    question: "A* Search uses the evaluation function f(n) = g(n) + h(n). What does h(n) represent?",
    options: [
      { key: "A", text: "The actual cost from the start node to n" },
      { key: "B", text: "The estimated cost from n to the goal (heuristic)" },
      { key: "C", text: "The total number of nodes explored" },
      { key: "D", text: "The depth of node n in the tree" },
    ],
    correctKey: "B",
    relatedTopic: "A* Search & Heuristics",
    lectureRef: "Lecture 02",
  },
  {
    id: 9,
    question: "BFS is guaranteed to find the shortest path when:",
    options: [
      { key: "A", text: "All edge weights are equal" },
      { key: "B", text: "The graph has no cycles" },
      { key: "C", text: "The heuristic is admissible" },
      { key: "D", text: "The search tree is infinite" },
    ],
    correctKey: "A",
    relatedTopic: "Breadth First Search (BFS)",
    lectureRef: "Lecture 02",
  },
  {
    id: 10,
    question: "Which statement about DFS is TRUE?",
    options: [
      { key: "A", text: "DFS is always optimal" },
      { key: "B", text: "DFS uses less memory than BFS in most cases" },
      { key: "C", text: "DFS explores nodes level by level" },
      { key: "D", text: "DFS guarantees the shortest path" },
    ],
    correctKey: "B",
    relatedTopic: "Depth First Search (DFS)",
    lectureRef: "Lecture 02",
  },

  // ── Lecture 03: Machine Learning Basics ─────────────────────────────────────
  {
    id: 11,
    question: "In supervised learning, the model is trained using:",
    options: [
      { key: "A", text: "Unlabeled data only" },
      { key: "B", text: "Random noise values" },
      { key: "C", text: "Labeled input-output pairs" },
      { key: "D", text: "No training data at all" },
    ],
    correctKey: "C",
    relatedTopic: "Supervised Learning",
    lectureRef: "Lecture 03",
  },
  {
    id: 12,
    question: "Which of the following is an example of a classification task?",
    options: [
      { key: "A", text: "Predicting the price of a house" },
      { key: "B", text: "Detecting whether an email is spam or not" },
      { key: "C", text: "Estimating tomorrow's temperature" },
      { key: "D", text: "Forecasting stock market values" },
    ],
    correctKey: "B",
    relatedTopic: "Classification",
    lectureRef: "Lecture 03",
  },
  {
    id: 13,
    question: "Overfitting in a machine learning model means:",
    options: [
      { key: "A", text: "The model performs well on training data but poorly on new data" },
      { key: "B", text: "The model is too simple to learn the data" },
      { key: "C", text: "The model ignores the training data entirely" },
      { key: "D", text: "The training process was terminated early" },
    ],
    correctKey: "A",
    relatedTopic: "Model Evaluation",
    lectureRef: "Lecture 03",
  },
  {
    id: 14,
    question: "In unsupervised learning, the algorithm tries to:",
    options: [
      { key: "A", text: "Predict a known target label" },
      { key: "B", text: "Find hidden patterns or groupings in unlabeled data" },
      { key: "C", text: "Memorize the training examples exactly" },
      { key: "D", text: "Follow explicit reward signals" },
    ],
    correctKey: "B",
    relatedTopic: "Unsupervised Learning",
    lectureRef: "Lecture 03",
  },
  {
    id: 15,
    question: "Which metric measures the fraction of correctly classified instances?",
    options: [
      { key: "A", text: "Loss" },
      { key: "B", text: "Variance" },
      { key: "C", text: "Accuracy" },
      { key: "D", text: "Bias" },
    ],
    correctKey: "C",
    relatedTopic: "Model Evaluation",
    lectureRef: "Lecture 03",
  },

  // ── Lecture 04: Neural Networks ──────────────────────────────────────────────
  {
    id: 16,
    question: "What is the primary role of an activation function in a neural network?",
    options: [
      { key: "A", text: "To introduce non-linearity into the network" },
      { key: "B", text: "To reduce the number of layers" },
      { key: "C", text: "To initialize the weights to zero" },
      { key: "D", text: "To compress input data" },
    ],
    correctKey: "A",
    relatedTopic: "Activation Functions",
    lectureRef: "Lecture 04",
  },
  {
    id: 17,
    question: "In a neural network, a 'bias' term is used to:",
    options: [
      { key: "A", text: "Slow down the learning process" },
      { key: "B", text: "Allow the activation function to shift, improving flexibility" },
      { key: "C", text: "Reduce the number of neurons" },
      { key: "D", text: "Connect two separate networks" },
    ],
    correctKey: "B",
    relatedTopic: "Weights and Biases",
    lectureRef: "Lecture 04",
  },
  {
    id: 18,
    question: "Backpropagation is used in neural networks to:",
    options: [
      { key: "A", text: "Add more hidden layers automatically" },
      { key: "B", text: "Compute gradients and update weights to minimize the loss" },
      { key: "C", text: "Generate new training data" },
      { key: "D", text: "Visualize the network architecture" },
    ],
    correctKey: "B",
    relatedTopic: "Backpropagation",
    lectureRef: "Lecture 04",
  },
  {
    id: 19,
    question: "Which activation function outputs values between 0 and 1?",
    options: [
      { key: "A", text: "ReLU" },
      { key: "B", text: "Tanh" },
      { key: "C", text: "Sigmoid" },
      { key: "D", text: "Linear" },
    ],
    correctKey: "C",
    relatedTopic: "Activation Functions (Sigmoid)",
    lectureRef: "Lecture 04",
  },
  {
    id: 20,
    question: "In a feedforward neural network, information flows:",
    options: [
      { key: "A", text: "Backwards from output to input only" },
      { key: "B", text: "In loops between all neurons" },
      { key: "C", text: "From input layer through hidden layers to output layer" },
      { key: "D", text: "Randomly between any two neurons" },
    ],
    correctKey: "C",
    relatedTopic: "Feedforward Networks",
    lectureRef: "Lecture 04",
  },
];

// ─── Fake Chat Responses ──────────────────────────────────────────────────────

export interface FakeChatEntry {
  keywords: string[];
  response: string;
}

export const fakeChatResponses: FakeChatEntry[] = [
  {
    keywords: ["ai", "artificial intelligence", "what is ai"],
    response:
      "Based on **Lecture 01**, Artificial Intelligence refers to the simulation of human intelligence in machines designed to think, learn, and problem-solve. The key distinction is between narrow AI (task-specific) and general AI (broad reasoning). The lecture highlights that AI encompasses sub-fields like Machine Learning and Deep Learning.",
  },
  {
    keywords: ["bfs", "breadth first", "breadth-first"],
    response:
      "**Lecture 02** covers BFS in detail. Breadth First Search explores all nodes at the current depth level before moving deeper. It guarantees finding the shortest path in unweighted graphs and is **complete** and **optimal** — but it can be memory-intensive since it stores all frontier nodes.",
  },
  {
    keywords: ["dfs", "depth first", "depth-first"],
    response:
      "According to **Lecture 02**, Depth First Search (DFS) follows a path as deep as possible before backtracking. It uses less memory than BFS but is **not guaranteed to find the optimal solution**. It's useful when the solution is known to be deep in the search tree.",
  },
  {
    keywords: ["a*", "a star", "astar", "heuristic"],
    response:
      "**Lecture 02** explains A* Search as an informed search algorithm that uses a heuristic function `h(n)` combined with the actual path cost `g(n)` to prioritize nodes: `f(n) = g(n) + h(n)`. A good heuristic dramatically reduces the search space while still finding the optimal path.",
  },
  {
    keywords: ["machine learning", "ml", "supervised", "unsupervised"],
    response:
      "**Lecture 03** introduces Machine Learning as the practice of building models from data. In **supervised learning**, you train on labeled examples (input → expected output). In **unsupervised learning**, the model discovers patterns in unlabeled data. Key metrics covered include accuracy, precision, and recall.",
  },
  {
    keywords: ["neural", "network", "neuron", "deep learning"],
    response:
      "From **Lecture 04**, a neural network is composed of layers of artificial neurons. Each neuron computes a weighted sum of inputs, adds a bias, then applies an **activation function** to introduce non-linearity. The network learns by adjusting weights via **backpropagation** to minimize a loss function.",
  },
  {
    keywords: ["activation", "relu", "sigmoid", "tanh"],
    response:
      "**Lecture 04** covers three main activation functions: **ReLU** (`max(0, x)`) — simple and effective for hidden layers; **Sigmoid** — maps output to (0,1), used for binary classification; **Tanh** — maps output to (-1,1), often better than sigmoid in practice. ReLU is currently the most widely used in deep networks.",
  },
  {
    keywords: ["backpropagation", "backprop", "training", "gradient"],
    response:
      "As introduced in **Lecture 04**, backpropagation is the algorithm used to train neural networks. It computes the gradient of the loss function with respect to each weight by applying the chain rule backwards through the network. These gradients are then used by an optimizer (e.g., SGD, Adam) to update the weights.",
  },
];

export const defaultChatResponse =
  "That's a great question! Based on the uploaded lectures in this course, this topic relates to fundamental AI concepts. I'd recommend reviewing **Lecture 01** for foundational definitions and **Lecture 02** for algorithmic problem-solving approaches. Feel free to ask something more specific!";
