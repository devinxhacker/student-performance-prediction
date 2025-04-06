import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { quiz } from '../services/api';

const Prediction = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        // Get student data from context or local storage
        //fetching user quiz answers
        const response = await quiz.getAnswers();
        const userData = response.data;
        console.log(userData);

        console.log("userData");
        console.log("User Data Details:");
        console.log("------------------");
        console.log("Basic Information:");
        console.log("User ID:", userData.userId);
        console.log("Current CGPA:", userData.currentCGPA);
        console.log("Education Level:", userData.education);
        console.log("Study Style:", userData.studyStyle);
        console.log("Parent Education:", userData.parentEducation);
        console.log("Screen Time:", userData.screenTime);
        console.log("Sleep Time:", userData.sleepTime);
        console.log("Achievements:", userData.achievements);
        console.log("Aim:", userData.aim);
        console.log("Goal CGPA:", userData.goal);
        console.log("Hobbies:", userData.hobbies);
        console.log("Created At:", userData.createdAt);

        console.log("\nADS Subject Details:");
        console.log("Marks:", userData.subjects.ads.marks);
        console.log("Attendance:", userData.subjects.ads.attendance);
        console.log("Interest:", userData.subjects.ads.interest);
        console.log("Assignments:", userData.subjects.ads.assignments);
        console.log("Quizzes:", userData.subjects.ads.quizzes);
        console.log("Participation:", userData.subjects.ads.participation);

        console.log("\nDS Subject Details:");
        console.log("Marks:", userData.subjects.ds.marks);
        console.log("Attendance:", userData.subjects.ds.attendance);
        console.log("Interest:", userData.subjects.ds.interest);
        console.log("Assignments:", userData.subjects.ds.assignments);
        console.log("Quizzes:", userData.subjects.ds.quizzes);
        console.log("Participation:", userData.subjects.ds.participation);

        console.log("\nAM Subject Details:");
        console.log("Marks:", userData.subjects.am.marks);
        console.log("Attendance:", userData.subjects.am.attendance);
        console.log("Interest:", userData.subjects.am.interest);
        console.log("Assignments:", userData.subjects.am.assignments);
        console.log("Quizzes:", userData.subjects.am.quizzes);
        console.log("Participation:", userData.subjects.am.participation);

        console.log("\nJava Subject Details:");
        console.log("Marks:", userData.subjects.java.marks);
        console.log("Attendance:", userData.subjects.java.attendance);
        console.log("Interest:", userData.subjects.java.interest);
        console.log("Assignments:", userData.subjects.java.assignments);
        console.log("Quizzes:", userData.subjects.java.quizzes);
        console.log("Participation:", userData.subjects.java.participation);

        console.log("\nDBMS Subject Details:");
        console.log("Marks:", userData.subjects.dbms.marks);
        console.log("Attendance:", userData.subjects.dbms.attendance);
        console.log("Interest:", userData.subjects.dbms.interest);
        console.log("Assignments:", userData.subjects.dbms.assignments);
        console.log("Quizzes:", userData.subjects.dbms.quizzes);
        console.log("Participation:", userData.subjects.dbms.participation);
        
        const studentData = {
          // Basic features in exact order from training data
          current_cgpa: userData.currentCGPA,
          education_level: userData.education,
          study_style: userData.studyStyle,
          parent_education: userData.parentEducation,
          screen_time: userData.screenTime,
          sleep_time: userData.sleepTime,
          // overall_attendance: userData.attendance,
          // overall_interest: userData.interest,
          // overall_performance: userData.performance,

          // ADS features in exact order
          ads_marks: userData.subjects.ads.marks,
          ads_attendance: userData.subjects.ads.attendance,
          ads_interest: userData.subjects.ads.interest,
          ads_assignments: userData.subjects.ads.assignments || 50,
          ads_quizzes: userData.subjects.ads.quizzes || 50,
          ads_participation: userData.subjects.ads.participation || 50,

          // DS features in exact order
          ds_marks: userData.subjects.ds.marks,
          ds_attendance: userData.subjects.ds.attendance,
          ds_interest: userData.subjects.ds.interest,
          ds_assignments: userData.subjects.ds.assignments || 50,
          ds_quizzes: userData.subjects.ds.quizzes || 50,
          ds_participation: userData.subjects.ds.participation || 50,

          // AM features in exact order
          am_marks: userData.subjects.am.marks,
          am_attendance: userData.subjects.am.attendance,
          am_interest: userData.subjects.am.interest,
          am_assignments: userData.subjects.am.assignments || 50,
          am_quizzes: userData.subjects.am.quizzes || 50,
          am_participation: userData.subjects.am.participation || 50,

          // Java features in exact order
          java_marks: userData.subjects.java.marks,
          java_attendance: userData.subjects.java.attendance,
          java_interest: userData.subjects.java.interest,
          java_assignments: userData.subjects.java.assignments || 50,
          java_quizzes: userData.subjects.java.quizzes || 50,
          java_participation: userData.subjects.java.participation || 50,

          // DBMS features in exact order
          dbms_marks: userData.subjects.dbms.marks,
          dbms_attendance: userData.subjects.dbms.attendance,
          dbms_interest: userData.subjects.dbms.interest,
          dbms_assignments: userData.subjects.dbms.assignments || 50,
          dbms_quizzes: userData.subjects.dbms.quizzes || 50,
          dbms_participation: userData.subjects.dbms.participation || 50
        };

        console.log("studentData");
        console.log(studentData);

        // Log the feature names in order
        console.log('Feature names in order:');
        Object.keys(studentData).forEach((key, index) => {
          console.log(`${index + 1}. ${key}`);
        });

        // Log the data types
        console.log('\nData types:');
        Object.entries(studentData).forEach(([key, value]) => {
          console.log(`${key}: ${typeof value} (${value})`);
        });

        // Log the request data for debugging
        console.log('\nSending request with data:', JSON.stringify(studentData, null, 2));

        try {
          console.log('\nMaking API request...');
          const response = await axios.post('http://localhost:5001/api/predict', studentData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('\nAPI Response:', response.data);
          setPredictions(response.data.predictions);
          setError(null);
        } catch (error) {
          console.error('\nError details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
          });
          setError(error.response?.data?.error || 'Failed to fetch predictions');
        } finally {
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching predictions: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading predictions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/studyplan')}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg 
            hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg 
            active:transform active:scale-95"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Get Study Plan
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8">Performance Predictions</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              Based on your past performance, attendance, and interest levels, here are your predicted scores for upcoming assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((pred, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{pred.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    parseInt(pred.improvement) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {pred.improvement}%
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Score:</span>
                    <span className="font-medium">{pred.currentScore}%</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Predicted Score:</span>
                    <span className="font-medium text-blue-600">{pred.predictedScore}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Prediction Confidence:</span>
                    <span className="font-medium">{pred.confidence}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedRecommendation({ subject: pred.subject, recommendations: pred.recommendations })}
                      className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Recommendations
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Factors Considered in Prediction</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Previous quiz marks</li>
              <li>Attendance percentage</li>
              <li>Subject interest level</li>
              <li>Overall performance trend</li>
            </ul>
          </div>
        </div>

        {/* Recommendations Modal */}
        {selectedRecommendation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedRecommendation.subject} Recommendations
                  </h3>
                  <button
                    onClick={() => setSelectedRecommendation(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedRecommendation.recommendations }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction; 