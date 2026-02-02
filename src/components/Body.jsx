import React, { useState, useEffect, useRef, useMemo } from "react";
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";
import { countNGOsByCategory } from "../utils/categoryUtils";

// Import sections
import {
  HeroSection,
  StatsSection,
  CategoriesSection,
  HowItWorksSection,
  NGOListingSection,
  RegistrationSection,
  AboutSection,
  CTASection,
} from "./sections";

import Toast from "./ui/Toast";

const Body = ({ selectedCategory, onCategorySelect, onClearCategory }) => {
  // Refs for scrolling
  const ngosRef = useRef(null);
  const registerRef = useRef(null);
  const aboutRef = useRef(null);

  // State management
  const [CurrentNGOData, setCurrentNGOData] = useState(0);
  const [NGODataForTable, setNGODataForTable] = useState([]);
  const [CurrentNGONonVerifyData, setCurrentNGONonVerifyData] = useState(0);
  const [CurrentDonationNGOData, setCurrentDonationNGOData] = useState(0);
  const [NonVerifyDonationNGOData, setNonVerifyDonationNGOData] = useState(0);
  const [newData, setNewData] = useState([]);
  const [newKeyValue, setNewKeyValue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Scroll handlers
  const scrollToNGOs = () => {
    ngosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Fetch verified NGO count
  useEffect(() => {
    const db = getDatabase();
    const ngoVerifyedData = ref(db, "NGO_DATA");
    onValue(
      ngoVerifyedData,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCurrentNGOData(Object.keys(data).length);
        } else {
          setCurrentNGOData(0);
        }
      },
      (error) => {
        console.error("Error fetching NGO data:", error);
        setCurrentNGOData(0);
      }
    );
  }, []);

  // Fetch non-verified NGO count
  useEffect(() => {
    const db = getDatabase();
    const ngoNonVerifyData = ref(db, "DataToVerify");
    onValue(
      ngoNonVerifyData,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCurrentNGONonVerifyData(Object.keys(data).length);
        } else {
          setCurrentNGONonVerifyData(0);
        }
      },
      (error) => {
        console.error("Error fetching NGO data:", error);
        setCurrentNGONonVerifyData(0);
      }
    );
  }, []);

  // Calculate new key value
  useEffect(() => {
    setNewKeyValue(CurrentNGOData + CurrentDonationNGOData + 1);
  }, [CurrentNGOData, CurrentDonationNGOData]);

  // Handle NGO form data
  const handleNGOChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => {
      const updatedData = [...prevData];
      updatedData[name] = value;
      return updatedData;
    });
  };

  // Handle NGO form submission
  const handleSubmitNGO = (event) => {
    event.preventDefault();
    const db = getDatabase();
    const dataToVerifyRef = ref(db, "DataToVerify");

    // Collect form data
    const formData = new FormData(event.target);
    const formArray = [];
    formData.forEach((value, key) => {
      formArray[parseInt(key)] = value;
    });

    get(dataToVerifyRef)
      .then((snapshot) => {
        let existingKeys = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          existingKeys = Object.keys(data)
            .map((key) => parseInt(key.split("_").pop()))
            .filter((key) => !isNaN(key))
            .sort((a, b) => a - b);
        }

        let nextAvailableKey;
        if (existingKeys.length === 0) {
          nextAvailableKey = CurrentNGOData + 1;
        } else {
          nextAvailableKey = Math.max(...existingKeys) + 1;
        }

        const newKey = `NGO_Finder_Data_${nextAvailableKey}`;

        set(ref(db, `DataToVerify/${newKey}`), formArray)
          .then(() => {
            console.log("Data Added Successfully");
            setIsSubmitted(true);
            setToastMessage("NGO registration submitted successfully!");
            setShowToast(true);
            event.target.reset();
            setTimeout(() => setIsSubmitted(false), 3000);
          })
          .catch((error) => {
            console.error("Error adding data:", error);
            setToastMessage("Error submitting registration. Please try again.");
            setShowToast(true);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch donation NGO count
  useEffect(() => {
    const db = getDatabase();
    const ngoNonVerifyData = ref(db, "donation");
    onValue(
      ngoNonVerifyData,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCurrentDonationNGOData(Object.keys(data).length);
        } else {
          setCurrentDonationNGOData(0);
        }
      },
      (error) => {
        console.error("Error fetching NGO data:", error);
        setCurrentDonationNGOData(0);
      }
    );
  }, []);

  // Fetch non-verified donation count
  useEffect(() => {
    const db = getDatabase();
    const ngoVerifyedData = ref(db, "DonationDataToVerify");
    onValue(
      ngoVerifyedData,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setNonVerifyDonationNGOData(Object.keys(data).length);
        } else {
          setNonVerifyDonationNGOData(0);
        }
      },
      (error) => {
        console.error("Error fetching NGO data:", error);
        setNonVerifyDonationNGOData(0);
      }
    );
  }, []);

  // Handle donation form data
  const handleNGODonationDataChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => {
      const updatedData = [...prevData];
      updatedData[name] = value;
      return updatedData;
    });
  };

  // Handle donation form submission
  const handleSubmitNGODonationData = (event) => {
    event.preventDefault();
    const db = getDatabase();
    const dataToVerifyRef = ref(db, "DonationDataToVerify");

    // Collect form data
    const formData = new FormData(event.target);
    const formArray = [];
    formData.forEach((value, key) => {
      formArray[parseInt(key)] = value;
    });

    get(dataToVerifyRef)
      .then((snapshot) => {
        let existingKeys = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          existingKeys = Object.keys(data)
            .map((key) => parseInt(key.split("_").pop()))
            .filter((key) => !isNaN(key))
            .sort((a, b) => a - b);
        }

        let nextAvailableKey;
        if (existingKeys.length === 0) {
          nextAvailableKey = CurrentDonationNGOData + 1;
        } else {
          nextAvailableKey = Math.max(...existingKeys) + 1;
        }

        const newKey = `${nextAvailableKey}`;

        set(ref(db, `DonationDataToVerify/${newKey}`), formArray)
          .then(() => {
            console.log("Data Added Successfully");
            setIsSubmitted(true);
            setToastMessage("Donation campaign submitted successfully!");
            setShowToast(true);
            event.target.reset();
            setTimeout(() => setIsSubmitted(false), 3000);
          })
          .catch((error) => {
            console.error("Error adding data:", error);
            setToastMessage("Error submitting campaign. Please try again.");
            setShowToast(true);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch NGO data for display
  useEffect(() => {
    const db = getDatabase();
    const dataForTable = ref(db, "NGO_DATA");
    onValue(
      dataForTable,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.entries(data);
          setNGODataForTable(dataArray);
        } else {
          console.log("No NGO data found.");
          setNGODataForTable([]);
        }
      },
      (error) => {
        console.error("Error fetching NGO data:", error);
        setNGODataForTable([]);
      }
    );
  }, []);

  // Export scroll functions for Header
  React.useEffect(() => {
    window.scrollToNGOs = scrollToNGOs;
    window.scrollToRegister = scrollToRegister;
    window.scrollToAbout = scrollToAbout;
  }, []);

  // Calculate category counts from NGO data using shared utility
  const categoryCounts = useMemo(() => {
    return countNGOsByCategory(NGODataForTable);
  }, [NGODataForTable]);

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection 
        ngoCount={CurrentNGOData}
        onScrollToNGOs={scrollToNGOs}
        onScrollToRegister={scrollToRegister}
      />

      {/* Stats Section */}
      <StatsSection 
        ngoCount={CurrentNGOData}
        donationCount={CurrentDonationNGOData}
      />

      {/* About Section */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Categories Section */}
      <CategoriesSection 
        onCategorySelect={onCategorySelect} 
        categoryCounts={categoryCounts}
        totalNGOs={NGODataForTable.length}
      />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* NGO Listing Section */}
      <NGOListingSection 
        ngoData={NGODataForTable}
        sectionRef={ngosRef}
        selectedCategory={selectedCategory}
        onClearCategory={onClearCategory}
      />

      {/* Registration Section */}
      <RegistrationSection
        onNGOSubmit={handleSubmitNGO}
        onDonationSubmit={handleSubmitNGODonationData}
        isSubmitted={isSubmitted}
        sectionRef={registerRef}
      />

      {/* CTA Section */}
      <CTASection 
        onFindNGOs={scrollToNGOs}
        onRegisterNGO={scrollToRegister}
      />

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        type={toastMessage.includes("Error") ? "error" : "success"}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </main>
  );
};

export default Body;
