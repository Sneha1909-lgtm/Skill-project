import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const QuizPage = () => {
  const { quizzes, updateQuizStatus } = useContext(DataContext);
  const { role } = useContext(AuthContext);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  // Fallback questions if none provided
  const sampleQuestions = [
    { id: 1, question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
    { id: 2, question: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correct: 1 },
    { id: 3, question: 'What is the maximum size of a stack?', options: ['Fixed', 'Dynamic', 'Both', 'None'], correct: 2 },
  ];

  useEffect(() => {
    let timer;
    if (selectedQuiz && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (selectedQuiz && timeLeft === 0) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [timeLeft, selectedQuiz]);

  const handleStartQuiz = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz.status === 'Available' || role === 'faculty' || role === 'admin') {
      setSelectedQuiz(quizId);
      setCurrentQuestion(0);
      setUserAnswers({});
      setTimeLeft(quiz.time * 60);
    } // faculty/admin can preview
  };

  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: optionIndex });
  };

  const calculateScore = () => {
    let correctCount = 0;
    // Note: mock logic assumes sampleQuestions
    const questions = sampleQuestions;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) correctCount++;
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmitQuiz = () => {
    if (role === 'faculty' || role === 'admin') {
        alert('Preview finished! Faculty/Admin scores are not recorded.');
        setSelectedQuiz(null);
        return;
    }
    const finalScore = calculateScore();
    updateQuizStatus(selectedQuiz, 'Completed', finalScore);
    alert(`Quiz Submitted! You scored ${finalScore}%`);
    setSelectedQuiz(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#2dd4bf';
      case 'Medium': return '#38bdf8';
      case 'Hard': return '#ef4444';
      default: return '#818cf8';
    }
  };

  if (selectedQuiz) {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    const questions = sampleQuestions;
    const question = questions[currentQuestion];

    return (
      <div className="quiz-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div className="section" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '1.6rem' }}>{quiz.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              <span style={{ color: timeLeft < 60 ? '#ef4444' : '#2dd4bf', fontWeight: 'bold' }}>
                ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>Question {currentQuestion + 1}/{questions.length}</span>
            </div>
          </div>
          
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ 
              width: `${((currentQuestion + 1) / questions.length) * 100}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              transition: 'width 0.3s'
            }}></div>
          </div>

          <div style={{ padding: '30px 24px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '30px', color: '#fff', lineHeight: 1.4 }}>
              {question.question}
            </h3>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    background: userAnswers[currentQuestion] === idx ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${userAnswers[currentQuestion] === idx ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '12px',
                    color: userAnswers[currentQuestion] === idx ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}
                  onClick={() => handleAnswerSelect(idx)}
                >
                  <span style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: userAnswers[currentQuestion] === idx ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                    color: userAnswers[currentQuestion] === idx ? '#000' : '#fff',
                    fontWeight: 'bold'
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
            <button 
              className="btn-secondary" 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              style={{ padding: '10px 20px', opacity: currentQuestion === 0 ? 0.3 : 1 }}
            >
              ← Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button className="btn-primary" onClick={handleSubmitQuiz}>Submit Quiz</button>
            ) : (
              <button className="btn-primary" onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}>
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>📚 Active Quizzes</h1>
        {(role === 'faculty' || role === 'admin') && (
            <p style={{ color: 'var(--accent-cyan)' }}>You have rights to preview quizzes.</p>
        )}
      </div>
      
      <div className="quiz-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {quizzes.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No quizzes available at the moment.</p> : null}
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card" style={{ borderLeft: `4px solid ${getDifficultyColor(quiz.difficulty)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>{quiz.title}</h3>
              <span style={{ 
                padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                background: `${getDifficultyColor(quiz.difficulty)}30`, color: getDifficultyColor(quiz.difficulty)
              }}>
                {quiz.difficulty}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>📖 {quiz.subject}</p>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', fontSize: '0.9rem', color: '#cad4e0' }}>
              <span>❓ {quiz.questions} Qs</span>
              <span>⏱️ {quiz.time} Min</span>
              {quiz.status === 'Completed' && role === 'student' && <span style={{ color: '#2dd4bf' }}>✅ Score: {quiz.score}%</span>}
            </div>
            
            <button 
              className={`btn-${(quiz.status === 'Available' || role !== 'student') ? 'primary' : 'disabled'}`}
              onClick={() => handleStartQuiz(quiz.id)}
              disabled={quiz.status !== 'Available' && role === 'student'}
              style={{ width: '100%', padding: '12px' }}
            >
              {(role !== 'student') ? '👁️ Preview Quiz' : quiz.status === 'Available' ? '▶️ Start Quiz' : 'Completed / Locked'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;