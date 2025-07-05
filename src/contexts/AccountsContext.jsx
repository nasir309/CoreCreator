import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AccountsContext = createContext(undefined);

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
};

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserAccounts();
    } else {
      setAccounts([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadUserAccounts = () => {
    try {
      const savedAccounts = localStorage.getItem('socialAccounts');
      if (savedAccounts) {
        const allAccounts = JSON.parse(savedAccounts);
        const userAccounts = allAccounts.filter((account) => account.userId === user?.id);
        setAccounts(userAccounts);
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAccounts = (updatedAccounts) => {
    try {
      const savedAccounts = localStorage.getItem('socialAccounts');
      let allAccounts = [];
      
      if (savedAccounts) {
        allAccounts = JSON.parse(savedAccounts);
      }

      // Remove old accounts for this user
      allAccounts = allAccounts.filter(account => account.userId !== user?.id);
      
      // Add updated accounts
      allAccounts = [...allAccounts, ...updatedAccounts];
      
      localStorage.setItem('socialAccounts', JSON.stringify(allAccounts));
    } catch (error) {
      console.error('Error saving accounts:', error);
    }
  };

  const addAccount = (accountData) => {
    if (!user) return;

    const newAccount = {
      ...accountData,
      id: Date.now().toString(),
      userId: user.id,
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    saveAccounts(updatedAccounts);
  };

  const updateAccount = (id, updates) => {
    const updatedAccounts = accounts.map(account =>
      account.id === id ? { ...account, ...updates } : account
    );
    setAccounts(updatedAccounts);
    saveAccounts(updatedAccounts);
  };

  const deleteAccount = (id) => {
    const updatedAccounts = accounts.filter(account => account.id !== id);
    setAccounts(updatedAccounts);
    saveAccounts(updatedAccounts);
  };

  const value = {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    isLoading,
  };

  return <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>;
};