import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  Table, 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink, 
  Search, 
  Briefcase, 
  Mail, 
  Clock, 
  User, 
  Layers, 
  Compass, 
  BookOpen, 
  Sparkles, 
  LayoutDashboard,
  CheckCircle2,
  Trash2,
  Calendar,
  X
} from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  getDoc,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from '../firebase';

interface AdminPanelProps {
  lang: 'RU' | 'EN';
  onClose: () => void;
}

interface Submission {
  id: string;
  createdAt: Timestamp | any;
  nameAgeCity: string;
  targetVacancy: string;
  contact: string;
  experience?: string;
  previousRoles?: string;
  collaborations?: string;
  tasks?: string;
  portfolio?: string;
  activeJobTitleRu?: string;
}

const AUTHORIZED_EMAIL = 'ggg274415@gmail.com';

export default function AdminPanel({ lang, onClose }: AdminPanelProps) {
  const isRu = lang === 'RU';
  
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string>('');
  
  // Alternative Email/Password admin login states
  const [useEmailAuth, setUseEmailAuth] = useState(false);
  const [emailInput, setEmailInput] = useState('ggg274415@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailAuthLoading, setEmailAuthLoading] = useState(false);
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string>('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVacancy, setSelectedVacancy] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Partners Management States
  const [activeTab, setActiveTab] = useState<'candidates' | 'partners'>('candidates');
  const [partners, setPartners] = useState<any[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    websiteUrl: '',
    descriptionRu: '',
    descriptionEn: '',
    logoSvg: '',
    logoUrl: ''
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadedLogoName, setUploadedLogoName] = useState('');

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setPartnerMsg('');
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        const response = await fetch('/api/upload-logo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename: file.name,
            base64: base64String,
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          setPartnerForm(prev => ({ ...prev, logoUrl: data.url }));
          setUploadedLogoName(file.name);
          setPartnerMsg(isRu 
            ? `Логотип "${file.name}" загружен и автоматически сопоставлен на диске!` 
            : `Logo "${file.name}" successfully uploaded and mapped on disk!`
          );
        } else {
          setPartnerMsg(isRu 
            ? `Ошибка загрузки логотипа: ${data.error || 'Неизвестная ошибка'}` 
            : `Failed uploading logo: ${data.error || 'Unknown error'}`
          );
        }
        setUploadingLogo(false);
      };
      reader.onerror = () => {
        setPartnerMsg(isRu ? 'Ошибка чтения файла.' : 'Error reading file.');
        setUploadingLogo(false);
      };
      
      reader.readAsDataURL(file);

    } catch (err: any) {
      console.error(err);
      setPartnerMsg(isRu ? 'Не удалось связаться с сервером для загрузки.' : 'Failed contacting upload server.');
      setUploadingLogo(false);
    }
  };
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerMsg, setPartnerMsg] = useState('');

  // Monitor Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
      
      if (user) {
        if (user.email === AUTHORIZED_EMAIL) {
          setAuthError('');
          fetchSubmissions();
          fetchPartners();
        } else {
          setAuthError(
            isRu 
              ? `Доступ заблокирован: ваш аккаунт ${user.email} не авторизован.` 
              : `Access Denied: your account ${user.email} is not authorized.`
          );
          // Auto sign out unauthorized users
          signOut(auth);
        }
      }
    });

    return () => unsubscribe();
  }, [isRu]);

  // Fetch Submissions from Firestore
  const fetchSubmissions = async () => {
    setLoadingData(true);
    setDataError('');
    try {
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const docsList: Submission[] = [];
      querySnapshot.forEach((docSnapshot) => {
        docsList.push({ id: docSnapshot.id, ...docSnapshot.data() } as Submission);
      });
      setSubmissions(docsList);
    } catch (err) {
      console.error('Error fetching submissions from cloud database:', err);
      setDataError(
        isRu 
          ? 'Не удалось загрузить анкеты. Проверьте соединение с БД.' 
          : 'Failed to retrieve applications. Verify your DB connection.'
      );
    } finally {
      setLoadingData(false);
    }
  };

  // Fetch Partners List from Cloud Database
  const fetchPartners = async () => {
    setLoadingPartners(true);
    try {
      const q = query(collection(db, 'partners'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const docsList: any[] = [];
      querySnapshot.forEach((docSnapshot) => {
        docsList.push({ id: docSnapshot.id, ...docSnapshot.data() });
      });
      setPartners(docsList);
    } catch (err) {
      console.error('Error fetching partners from backend:', err);
    } finally {
      setLoadingPartners(false);
    }
  };

  // Handle addition of a new secure Partner document
  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name.trim() || !partnerForm.descriptionRu.trim() || !partnerForm.descriptionEn.trim()) {
      setPartnerMsg(isRu ? 'Пожалуйста, заполните название партнера и его описание на двух языках.' : 'Please enter the partner name and description on both languages.');
      return;
    }

    setPartnerSubmitting(true);
    setPartnerMsg('');
    try {
      const newDocRef = doc(collection(db, 'partners'));
      const payload = {
        id: newDocRef.id,
        createdAt: serverTimestamp(),
        name: partnerForm.name.trim(),
        descriptionRu: partnerForm.descriptionRu.trim(),
        descriptionEn: partnerForm.descriptionEn.trim(),
        websiteUrl: partnerForm.websiteUrl.trim() || '',
        logoSvg: partnerForm.logoSvg.trim() || '',
        logoUrl: partnerForm.logoUrl.trim() || ''
      };

      await setDoc(newDocRef, payload);

      setPartnerForm({
        name: '',
        websiteUrl: '',
        descriptionRu: '',
        descriptionEn: '',
        logoSvg: '',
        logoUrl: ''
      });
      setUploadedLogoName('');
      setPartnerMsg(isRu ? 'Партнер успешно зарегистрирован!' : 'Partner successfully registered!');
      fetchPartners();
    } catch (err) {
      console.error('Error creating partner document:', err);
      setPartnerMsg(isRu ? 'Ошибка при добавлении в базу данных.' : 'Failed saving to Cloud Firestore.');
    } finally {
      setPartnerSubmitting(false);
    }
  };

  // Handle deletion of a Partner document
  const handleDeletePartner = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(isRu ? 'Вы уверены, что хотите удалить этого партнера?' : 'Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'partners', id));
      setPartners(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting partner document:', err);
      alert(isRu ? 'Не удалось удалить запись' : 'Failed to delete record');
    }
  };

  const handleLogin = async () => {
    setAuthError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('OAuth error during admin authorization:', err);
      setAuthError(
        isRu 
          ? 'Ошибка авторизации. Попробуйте войти снова.' 
          : 'Authorization failed. Please try again.'
      );
    }
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');
    setEmailAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
    } catch (err: any) {
      console.error('Email password login error:', err);
      let message = isRu
        ? 'Не удалось войти по e-mail. Убедитесь, что логин и пароль администратора верны.'
        : 'Failed signing in with Email. Double check credentials and console setup.';
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        message = isRu
          ? 'Неверный e-mail или пароль администратора.'
          : 'Invalid admin e-mail or password.';
      } else if (err.code === 'auth/user-disabled') {
        message = isRu ? 'Учетная запись администратора отключена.' : 'Admin account has been disabled.';
      }
      setAuthError(message);
    } finally {
      setEmailAuthLoading(false);
    }
  };

  const handleRegisterAdminWithPassword = async () => {
    setAuthError('');
    setAuthSuccessMsg('');
    
    if (emailInput.trim() !== AUTHORIZED_EMAIL) {
      setAuthError(isRu 
        ? 'Регистрация разрешена только для официальной почты администратора: ' + AUTHORIZED_EMAIL
        : 'Registration is exclusively allowed for the official admin email: ' + AUTHORIZED_EMAIL
      );
      return;
    }

    if (passwordInput.length < 6) {
      setAuthError(isRu
        ? 'Пароль должен содержать минимум 6 символов.'
        : 'Password must be at least 6 characters.'
      );
      return;
    }

    setEmailAuthLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
      setAuthSuccessMsg(isRu
        ? 'Учетная запись успешно создана и привязана! Вы вошли как администратор.'
        : 'Admin account successfully created and bound! You are logged in.'
      );
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setAuthError(isRu
          ? 'Данная почта уже используется. Войдите под своим текущим паролем или нажмите на кнопку ниже для сброса/установки нового пароля.'
          : 'This email is already in use. Please sign in with your password or use the reset/setup button below.'
        );
      } else {
        setAuthError(err?.message || String(err));
      }
    } finally {
      setEmailAuthLoading(false);
    }
  };

  const handleSendPasswordReset = async () => {
    setAuthError('');
    setAuthSuccessMsg('');
    
    if (emailInput.trim() !== AUTHORIZED_EMAIL) {
      setAuthError(isRu 
        ? 'Сброс пароля доступен только для официальной почты администратора: ' + AUTHORIZED_EMAIL
        : 'Password reset is only allowed for the official admin email: ' + AUTHORIZED_EMAIL
      );
      return;
    }

    setEmailAuthLoading(true);
    try {
      await sendPasswordResetEmail(auth, emailInput.trim());
      setAuthSuccessMsg(isRu
        ? 'Ссылка для создания/сброса пароля отправлена на вашу почту! Проверьте входящие или папку Спам.'
        : 'Password setup link has been sent to your email! Please check your inbox or Spam folder.'
      );
    } catch (err: any) {
      console.error('Password reset error:', err);
      setAuthError(isRu
        ? 'Не удалось отправить письмо со ссылкой. Убедитесь, что e-mail/провайдер настроен.'
        : 'Failed sending password reset. Please verify setup.'
      );
    } finally {
      setEmailAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSubmissions([]);
      setSelectedSubmission(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleDeleteSubmission = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(isRu ? 'Вы уверены, что хотите удалить эту анкету?' : 'Are you sure you want to delete this submission?')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'submissions', id));
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(isRu ? 'Не удалось удалить запись из БД' : 'Failed to delete record');
    }
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.nameAgeCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.experience && sub.experience.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesVacancy = selectedVacancy === 'all' || sub.targetVacancy === selectedVacancy;
    
    return matchesSearch && matchesVacancy;
  });

  // Calculate Aggregations
  const stats = {
    total: submissions.length,
    ar: submissions.filter(s => s.targetVacancy === 'ar-manager').length,
    artist: submissions.filter(s => s.targetVacancy === 'artist-manager').length,
    smm: submissions.filter(s => s.targetVacancy === 'smm-specialist').length,
    promo: submissions.filter(s => s.targetVacancy === 'promo-manager').length,
  };

  const formatFirebaseDate = (timestamp: any) => {
    if (!timestamp) return '...';
    try {
      const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString(isRu ? 'ru-RU' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '...';
    }
  };

  const isAuthorized = currentUser && currentUser.email === AUTHORIZED_EMAIL;

  return (
    <div className="min-h-screen bg-[#fafafc] pt-24 pb-32 px-6 md:px-12 relative block font-sans">
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Navigation Return Button */}
        <div className="mb-10 flex justify-between items-center">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-950 border border-neutral-200 hover:border-neutral-900 rounded-full text-[11px] font-mono font-bold tracking-widest text-neutral-800 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
            <span>{isRu ? "ЗАКРЫТЬ ПУЛЬТ БД" : "CLOSE CONTROL PANEL"}</span>
          </button>
          
          {isAuthorized && (
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-600 border border-rose-200 text-rose-600 hover:text-white rounded-full text-[11px] font-mono font-bold tracking-widest transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isRu ? "ВЫЙТИ" : "SIGN OUT"}</span>
            </button>
          )}
        </div>

        {/* AUTHENTICATION GATE SCREEN: If not logged in as admin */}
        {!isAuthorized ? (
          <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl border border-neutral-200 shadow-md text-center space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-orange/5 border border-brand-orange/20 text-brand-orange mx-auto rounded-full flex items-center justify-center animate-pulse">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-[#e1222e] font-black tracking-widest uppercase">
                  // NIGHTVOLT DATABASE GATE
                </span>
                <h2 className="text-xl font-display font-black text-neutral-950 uppercase tracking-tight">
                  СПЕЦДОСТУП К АНКЕТАМ
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {isRu 
                    ? "Эта панель скрыта от публики, поисковиков и индексаторов. Для просмотра резюме авторизуйтесь через официальную почту администратора." 
                    : "This section is excluded from robotic crawls and sitemaps. Access is strictly granted details mapping authorized administrative emails."}
                </p>
              </div>
            </div>

            {authError && (
              <div className="p-4 bg-rose-50 border border-rose-200/60 rounded-xl text-left flex gap-3 text-rose-600 text-xs font-light">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            {authSuccessMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200/60 rounded-xl text-left flex gap-3 text-emerald-700 text-xs font-light">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{authSuccessMsg}</p>
              </div>
            )}

            {loadingAuth ? (
              <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-neutral-400">
                <div className="w-3.5 h-3.5 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin" />
                <span>{isRu ? 'ПРОВЕРКА АВТОРИЗАЦИИ...' : 'AUTHORIZING STATUS...'}</span>
              </div>
            ) : (
              <div className="space-y-4">
                {!useEmailAuth ? (
                  <div className="space-y-4">
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center gap-3 py-3 bg-[#e1222e] hover:bg-neutral-950 border border-[#e1222e] hover:border-neutral-950 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>{isRu ? "ВОЙТИ ЧЕРЕЗ GOOGLE" : "OAUTH GOOGLE AUTH"}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setUseEmailAuth(true)}
                      className="text-xs text-neutral-400 hover:text-brand-orange transition-colors font-mono tracking-wide underline bg-transparent border-none cursor-pointer"
                    >
                      {isRu ? "Войти или настроить пароль" : "Sign in / Setup with password"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEmailPasswordLogin} className="space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block select-none">
                        {isRu ? "E-mail Администратора *" : "Admin Email *"}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none transition-all font-mono"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block select-none">
                        {isRu ? "Пароль *" : "Password *"}
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none transition-all font-mono"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setUseEmailAuth(false)}
                          className="flex-1 py-2.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase cursor-pointer select-none"
                        >
                          {isRu ? "Назад" : "Back"}
                        </button>
                        
                        <button
                          type="submit"
                          disabled={emailAuthLoading}
                          className="flex-1 py-2.5 bg-[#e1222e] hover:bg-neutral-950 text-white rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 select-none font-bold"
                        >
                          {emailAuthLoading ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <LogIn className="w-3.5 h-3.5" />
                          )}
                          <span>{isRu ? "ВОЙТИ" : "LOGIN"}</span>
                        </button>
                      </div>

                      <div className="border-t border-neutral-100 mt-4 pt-4 space-y-3">
                        <button
                          type="button"
                          disabled={emailAuthLoading}
                          onClick={handleRegisterAdminWithPassword}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 select-none"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                          <span>{isRu ? "СОЗДАТЬ/ЗАРЕГИСТРИРОВАТЬ ПАРОЛЬ" : "REGISTER / CREATE PASSWORD"}</span>
                        </button>

                        <button
                          type="button"
                          disabled={emailAuthLoading}
                          onClick={handleSendPasswordReset}
                          className="w-full text-center py-1.5 text-[11px] text-neutral-400 hover:text-brand-orange transition-colors font-mono tracking-wide underline bg-transparent border-none cursor-pointer"
                        >
                          {isRu ? "Сбросить/Установить пароль по e-mail ссылке" : "Setup / Reset password via email link"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            <div className="border-t border-neutral-100 pt-5 font-mono text-[9px] text-neutral-400">
              SECURE_TLS_ENCRYPTION_ACTIVE // PORT: 3000
            </div>
          </div>
        ) : (
          
          /* SECURE MASTER VIEW FOR AUTHORIZED ADMIN */
          <div className="space-y-8">
            
            {/* Header branding */}
            <div className="border-b border-neutral-200/60 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 mr-1">
              <div>
                <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] tracking-widest uppercase font-black mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span>{isRu ? "СЕССИЯ АДМИНИСТРАТОРА" : "ADMIN ACTIVE SECTOR"}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-black text-neutral-950 uppercase tracking-tight">
                  {activeTab === 'candidates' ? (isRu ? "БАЗА КАНДИДАТОВ" : "CANDIDATES DATABASE") : (isRu ? "ПАРТНЕРСКАЯ СЕТЬ" : "PARTNERS NETWORK")}
                </h1>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">
                  CURRENT USER: <span className="text-brand-blue font-bold">{currentUser.email}</span>
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Tab Switch buttons */}
                <div className="flex p-1 bg-neutral-100 rounded-xl border border-neutral-200/60 shadow-xs">
                  <button
                    onClick={() => setActiveTab('candidates')}
                    className={`py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                      activeTab === 'candidates'
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-950'
                    }`}
                  >
                    {isRu ? 'Анкеты' : 'Briefs'}
                  </button>
                  <button
                    onClick={() => setActiveTab('partners')}
                    className={`py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                      activeTab === 'partners'
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-950'
                    }`}
                  >
                    {isRu ? 'Партнеры' : 'Partners'}
                  </button>
                </div>

                <button
                  onClick={activeTab === 'candidates' ? fetchSubmissions : fetchPartners}
                  disabled={loadingData || loadingPartners}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-mono font-bold tracking-wide uppercase hover:bg-neutral-900 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${(loadingData || loadingPartners) ? 'animate-spin' : ''}`} />
                  <span>{isRu ? "ОБНОВИТЬ" : "REFRESH"}</span>
                </button>
              </div>
            </div>

            {activeTab === 'candidates' ? (
              <>

            {/* Micro Dashboard Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white border border-neutral-200/80 p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">
                  {isRu ? "ВСЕГО АНКЕТ" : "TOTAL BRIEFS"}
                </span>
                <span className="text-3xl font-display font-black mt-2 text-neutral-950">{stats.total}</span>
              </div>
              <div className="bg-white border border-neutral-200/80 p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-[9px] text-emerald-500 font-bold uppercase tracking-wider block">
                  A&R MANAGER
                </span>
                <span className="text-3xl font-display font-black mt-2 text-neutral-950">{stats.ar}</span>
              </div>
              <div className="bg-white border border-neutral-200/80 p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-[9px] text-brand-blue font-bold uppercase tracking-wider block">
                  ARTIST MANAGER
                </span>
                <span className="text-3xl font-display font-black mt-2 text-neutral-950">{stats.artist}</span>
              </div>
              <div className="bg-white border border-neutral-200/80 p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-wider block">
                  SMM SPECIALIST
                </span>
                <span className="text-3xl font-display font-black mt-2 text-neutral-950">{stats.smm}</span>
              </div>
              <div className="bg-white border border-neutral-200/80 p-5 rounded-2xl flex flex-col justify-between col-span-2 lg:col-span-1">
                <span className="font-mono text-[9px] text-purple-500 font-bold uppercase tracking-wider block">
                  PROMO COPYWRITER
                </span>
                <span className="text-3xl font-display font-black mt-2 text-neutral-950">{stats.promo}</span>
              </div>
            </div>

            {/* Filtering Controls Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search input */}
              <div className="w-full md:w-96 relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={isRu ? "Поиск по имени, контакту, тексту..." : "Search name, handles, key terms..."}
                  className="w-full bg-white border border-neutral-200 focus:outline-none focus:border-brand-blue rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Vacancy Category Tab buttons */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200/60 w-full md:w-auto">
                {[
                  { id: 'all', label: isRu ? 'ВСЕ ВАКАНСИИ' : 'ALL POSITIONS' },
                  { id: 'ar-manager', label: 'A&R' },
                  { id: 'artist-manager', label: isRu ? 'Менеджер' : 'Liaison' },
                  { id: 'smm-specialist', label: 'SMM' },
                  { id: 'promo-manager', label: isRu ? 'Промо' : 'Promo' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedVacancy(tab.id)}
                    className={`flex-1 md:flex-initial py-2 px-3.5 rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      selectedVacancy === tab.id
                        ? 'bg-neutral-950 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-950 hover:bg-white/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TWO COLUMN GRID: Left (Submissions list table), Right (Full Submission detail) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Section - List Table of Candidates (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-400 font-bold uppercase flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-brand-orange" />
                    {isRu ? "ЗАПИСИ АНКЕТ" : "SUBMISSIONS LOG"}
                  </span>
                  <span className="font-mono text-[9px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                    {filteredSubmissions.length} {isRu ? "найдено" : "records"}
                  </span>
                </div>

                {loadingData ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                    <div className="w-8 h-8 border-3 border-brand-orange border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono text-xs text-neutral-400">{isRu ? 'Сканирование базы данных...' : 'Reading DB sector...'}</span>
                  </div>
                ) : dataError ? (
                  <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-2">
                    <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
                    <p className="text-xs text-red-700 font-mono font-bold">{dataError}</p>
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="text-center py-16 text-neutral-400 font-light text-xs space-y-1">
                    <LayoutDashboard className="w-8 h-8 mx-auto text-neutral-200 mb-2" />
                    <p className="font-bold text-neutral-500">{isRu ? 'Ничего не найдено' : 'No records match filter'}</p>
                    <p className="text-neutral-400 text-[10px]">{isRu ? 'Попробуйте изменить поисковый запрос' : 'Try updating your filters'}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-100 text-[10px] font-mono text-neutral-400 uppercase tracking-wider pb-2">
                          <th className="py-3 font-bold">{isRu ? "Дата / Кандидат" : "Date / Candidate"}</th>
                          <th className="py-3 font-bold">{isRu ? "Вакансия" : "Position"}</th>
                          <th className="py-3 font-bold">{isRu ? "Связь" : "Contact"}</th>
                          <th className="py-3 text-right font-bold w-12">{isRu ? "Удал" : "Del"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-50">
                        {filteredSubmissions.map((sub) => {
                          const isSelected = selectedSubmission?.id === sub.id;
                          return (
                            <tr
                              key={sub.id}
                              onClick={() => setSelectedSubmission(sub)}
                              className={`group cursor-pointer transition-all hover:bg-neutral-50 ${
                                isSelected ? 'bg-brand-blue/5 hover:bg-brand-blue/5' : ''
                              }`}
                            >
                              <td className="py-3.5 pr-2">
                                <div className="space-y-0.5">
                                  <p className="font-mono text-[9px] text-[#7e8c9c] flex items-center gap-1">
                                    <Clock className="w-3 h-3 shrink-0" />
                                    {formatFirebaseDate(sub.createdAt)}
                                  </p>
                                  <p className="font-bold text-neutral-900 line-clamp-1">{sub.nameAgeCity}</p>
                                </div>
                              </td>
                              <td className="py-3.5 pr-2 vertical-align-middle">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                                  sub.targetVacancy === 'ar-manager' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                  sub.targetVacancy === 'artist-manager' ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/10' :
                                  sub.targetVacancy === 'smm-specialist' ? 'bg-orange-50 text-brand-orange border border-orange-100' :
                                  'bg-purple-50 text-purple-600 border border-purple-100'
                                }`}>
                                  {sub.targetVacancy === 'ar-manager' ? 'A&R' :
                                   sub.targetVacancy === 'artist-manager' ? (isRu ? 'Менеджер' : 'Liaison') :
                                   sub.targetVacancy === 'smm-specialist' ? 'SMM' : 'PROMO'}
                                </span>
                              </td>
                              <td className="py-3.5 pr-1">
                                <p className="text-brand-blue underline font-mono text-[10px] break-all line-clamp-1">{sub.contact}</p>
                              </td>
                              <td className="py-3.5 text-right w-12">
                                <button
                                  onClick={(e) => handleDeleteSubmission(sub.id, e)}
                                  className="p-1 px-2.5 hover:bg-rose-55 rounded text-neutral-300 hover:text-rose-500 transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right Section - Detail view of selected submission (lg:col-span-5) */}
              <div className="lg:col-span-5 md:sticky md:top-28">
                <AnimatePresence mode="wait">
                  {selectedSubmission ? (
                    <motion.div
                      key={selectedSubmission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-md space-y-6"
                    >
                      {/* Header candidate profile card */}
                      <div className="border-b border-neutral-100 pb-5 space-y-3">
                        <div className="flex gap-2.5 items-center">
                          <div className="w-10 h-10 bg-brand-orange/5 border border-brand-orange/15 rounded-full flex items-center justify-center text-brand-orange">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">{isRu ? "КАНДИДАТ" : "CANDIDATE DOSSIER"}</p>
                            <h3 className="text-lg font-display font-black text-neutral-900 uppercase tracking-tight leading-none mt-0.5">{selectedSubmission.nameAgeCity.split(',')[0]}</h3>
                          </div>
                        </div>

                        <div className="font-mono text-[9px] space-y-1 text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/40">
                          <p><strong className="text-neutral-800">{isRu ? "ID записи:" : "Record ID:"}</strong> {selectedSubmission.id}</p>
                          <p><strong className="text-neutral-800">{isRu ? "Отправлено:" : "Timestamp:"}</strong> {formatFirebaseDate(selectedSubmission.createdAt)}</p>
                          <p><strong className="text-neutral-800">{isRu ? "Вакансия:" : "Role applied:"}</strong> <span className="text-brand-orange font-bold uppercase">{selectedSubmission.activeJobTitleRu || selectedSubmission.targetVacancy}</span></p>
                        </div>
                      </div>

                      {/* Full detail scrollable area */}
                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 text-left">
                        {/* 1. Name age city info */}
                        <div className="space-y-1">
                          <h4 className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-wider">1. {isRu ? "ФИО / Возраст / Город" : "1. Info details"}</h4>
                          <p className="text-xs text-neutral-800 font-light leading-relaxed whitespace-pre-wrap">{selectedSubmission.nameAgeCity}</p>
                        </div>

                        {/* 2. Music sphere experience */}
                        {selectedSubmission.experience && (
                          <div className="space-y-1">
                            <h4 className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-wider">2. {isRu ? "Опыт в музыкальной сфере" : "2. Industry Experience"}</h4>
                            <p className="text-xs text-neutral-800 font-light leading-relaxed whitespace-pre-wrap">{selectedSubmission.experience}</p>
                          </div>
                        )}

                        {/* 3. Previous held roles */}
                        {selectedSubmission.previousRoles && (
                          <div className="space-y-1">
                            <h4 className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-wider">3. {isRu ? "Работа в других проектах/лейблах" : "3. Previous Teams/Agencies"}</h4>
                            <p className="text-xs text-neutral-800 font-light leading-relaxed whitespace-pre-wrap">{selectedSubmission.previousRoles}</p>
                          </div>
                        )}

                        {/* 4. Collaborations */}
                        {selectedSubmission.collaborations && (
                          <div className="space-y-1">
                            <h4 className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-wider">4. {isRu ? "Предыдущие сотрудничества" : "4. Handled Collaborations"}</h4>
                            <p className="text-xs text-neutral-800 font-light leading-relaxed whitespace-pre-wrap">{selectedSubmission.collaborations}</p>
                          </div>
                        )}

                        {/* 5. Tasks carried out */}
                        {selectedSubmission.tasks && (
                          <div className="space-y-1">
                            <h4 className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-wider">5. {isRu ? "Какие задачи выполнял" : "5. Sub-tasks & Operations"}</h4>
                            <p className="text-xs text-neutral-800 font-light leading-relaxed whitespace-pre-wrap">{selectedSubmission.tasks}</p>
                          </div>
                        )}

                        {/* 6. Portfolio/work examples */}
                        {selectedSubmission.portfolio && (
                          <div className="space-y-1 p-3 bg-brand-blue/5 border border-brand-blue/15 rounded-2xl">
                            <h4 className="font-mono text-[9px] text-brand-blue font-black uppercase tracking-wider flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              6. {isRu ? "Портфолио и ссылки" : "6. Work Artifacts & Links"}
                            </h4>
                            <p className="text-xs text-neutral-800 font-light leading-relaxed font-mono break-all whitespace-pre-wrap">{selectedSubmission.portfolio}</p>
                          </div>
                        )}
                      </div>

                      {/* Contact row block with action buttons */}
                      <div className="pt-3 border-t border-neutral-100 space-y-2.5 text-left">
                        <div className="space-y-1">
                          <h4 className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-wider">{isRu ? "КОНТАКТ ДЛЯ СВЯЗИ" : "PRIMARY FEEDBACK LINK"}</h4>
                          <p className="text-sm font-mono text-brand-blue font-bold select-all break-all">{selectedSubmission.contact}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          {selectedSubmission.contact.trim().startsWith('@') || !selectedSubmission.contact.trim().includes('@') ? (
                            <a
                              href={`https://t.me/${selectedSubmission.contact.replace('@', '').trim()}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 bg-brand-blue text-white hover:bg-neutral-950 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>TELEGRAM</span>
                            </a>
                          ) : (
                            <a
                              href={`mailto:${selectedSubmission.contact.trim()}`}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 bg-brand-blue text-white hover:bg-neutral-950 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>EMAIL</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-selection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-neutral-50/50 border border-neutral-200/50 p-12 rounded-3xl text-center space-y-3 min-h-[300px] flex flex-col justify-center items-center"
                    >
                      <Layers className="w-8 h-8 text-neutral-300" />
                      <p className="text-xs text-neutral-400 font-light font-mono">
                        {isRu ? "ВЫБЕРИТЕ АНКЕТУ ДЛЯ ПРОСМОТРА" : "SELECT A BRIEF RECORD TO REVIEW DETAILS"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Create Partner Form */}
            <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <h3 className="font-mono text-[10px] tracking-widest text-[#7e8c9c] font-black uppercase text-left">
                  {isRu ? "ДОБАВИТЬ НОВОГО ПАРТНЕРА" : "REGISTER NEW PARTNER"}
                </h3>
              </div>

              {partnerMsg && (
                <div className={`p-4 rounded-xl text-xs text-left ${
                  partnerMsg.includes('успешно') || partnerMsg.includes('successfully')
                    ? 'bg-emerald-50 border border-emerald-200/60 text-emerald-700'
                    : 'bg-rose-50 border border-rose-200/60 text-rose-600'
                }`}>
                  {partnerMsg}
                </div>
              )}

              <form onSubmit={handleAddPartner} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                    {isRu ? "Название компании / лейбла *" : "Partner Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Media Vision Group"
                    className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none transition-all"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                {/* Website URL */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                    {isRu ? "Ссылка на сайт (опционально)" : "Website URL (optional)"}
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none transition-all"
                    value={partnerForm.websiteUrl}
                    onChange={(e) => setPartnerForm(prev => ({ ...prev, websiteUrl: e.target.value }))}
                  />
                </div>

                {/* Description RU */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                    {isRu ? "Описание (Русский) *" : "Description (Russian) *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isRu ? "Опишите деятельность партнера на русском языке..." : "Type Russian description..."}
                    className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none transition-all resize-none"
                    value={partnerForm.descriptionRu}
                    onChange={(e) => setPartnerForm(prev => ({ ...prev, descriptionRu: e.target.value }))}
                  />
                </div>

                {/* Description EN */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                    {isRu ? "Описание (Английский) *" : "Description (English) *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isRu ? "Опишите деятельность партнера на английском языке..." : "Type English description..."}
                    className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none transition-all resize-none"
                    value={partnerForm.descriptionEn}
                    onChange={(e) => setPartnerForm(prev => ({ ...prev, descriptionEn: e.target.value }))}
                  />
                </div>

                {/* Brand Logo Upload File */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                    {isRu ? "Загрузить графический логотип (сохраняется в /src/assets/images/)" : "Upload Logo Graphic (saves to /src/assets/images/)"}
                  </label>
                  <div className="relative border-2 border-dashed border-neutral-200 hover:border-brand-orange rounded-xl p-4 text-center transition-colors bg-neutral-50/50 hover:bg-white cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="space-y-1 pointer-events-none">
                      <div className="flex items-center justify-center text-neutral-400 group-hover:text-brand-orange transition-colors">
                        {uploadingLogo ? (
                          <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Sparkles className="w-5 h-5 text-neutral-400 group-hover:animate-bounce" />
                        )}
                      </div>
                      <p className="text-xs font-bold text-neutral-800">
                        {uploadingLogo 
                          ? (isRu ? "Загрузка файла..." : "Uploading file...")
                          : partnerForm.logoUrl 
                          ? (isRu ? "Файл успешно выбран ✨" : "File selected successfully ✨")
                          : (isRu ? 'Выберите изображение PNG/JPG/SVG' : 'Choose PNG/JPG/SVG Image')
                        }
                      </p>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        {partnerForm.logoUrl 
                          ? `${uploadedLogoName} (${partnerForm.logoUrl})` 
                          : (isRu ? 'Перетащите файл сюда или нажмите для выбора' : 'Drag & drop or click to choose file')
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inline Logo SVG */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase block">
                    {isRu ? "Векторный логотип напрямую (Inline SVG, опционально)" : "Vector Logo markup directly (Inline SVG, optional)"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder='e.g. <svg viewBox="0 0 100 100">...</svg>'
                    className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 focus:border-brand-blue rounded-xl px-4 py-2.5 text-xs font-mono text-neutral-800 focus:outline-none transition-all resize-none"
                    value={partnerForm.logoSvg}
                    onChange={(e) => setPartnerForm(prev => ({ ...prev, logoSvg: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  disabled={partnerSubmitting}
                  className="w-full py-3 bg-brand-orange hover:bg-neutral-950 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {partnerSubmitting ? (isRu ? 'СОХРАНЕНИЕ...' : 'REGISTERING...') : (isRu ? 'ДОБАВИТЬ ПАРТНЕРА' : 'ADD PARTNER')}
                </button>
              </form>
            </div>

            {/* Right Side: Active Database Partners */}
            <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-[#7e8c9c] font-black uppercase flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brand-blue" />
                  {isRu ? "АКТИВНЫЕ ПАРТНЕРЫ В БД" : "DATABASE PARTNERS LOG"}
                </span>
                <button 
                  onClick={fetchPartners}
                  disabled={loadingPartners}
                  className="p-1 text-neutral-400 hover:text-brand-orange transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingPartners ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                {/* Hardcoded Default Media Vision Group Header */}
                <div className="p-4 bg-brand-orange/[0.02] border border-neutral-100/80 rounded-2xl flex justify-between gap-4 select-none">
                  <div className="space-y-1.5 text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange" />
                      <h4 className="font-display font-black text-sm text-neutral-900">Media Vision Group</h4>
                      <span className="text-[8px] font-mono bg-brand-orange/10 text-brand-orange px-1.5 rounded uppercase font-bold">
                        {isRu ? 'Статический' : 'Durable'}
                      </span>
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed text-[11px] line-clamp-2">
                      {isRu ? 'Прогрессивный музыкальный лейбл и дистрибьютор, сотрудничающий с NIGHTVOLT...' : 'A progressive music label and distributor collaborating with NIGHTVOLT...'}
                    </p>
                  </div>
                </div>

                {/* Dynamic Partners fetch list */}
                {loadingPartners ? (
                  <div className="py-8 text-center text-xs font-mono text-neutral-400 animate-pulse">
                    {isRu ? 'ЗАГРУЗКА ПАРТНЕРОВ...' : 'FETCHING CLOUD PARTNERS...'}
                  </div>
                ) : partners.length === 0 ? (
                  <div className="py-8 text-center font-mono text-[11px] text-neutral-400 border border-dashed border-neutral-200 rounded-2xl">
                    {isRu ? 'НЕТ ДОБАВЛЕННЫХ ПАРТНЕРОВ' : 'NO DYNAMIC PARTNERS YET'}
                  </div>
                ) : (
                  partners.map((partner) => (
                    <div 
                      key={partner.id}
                      className="p-4 bg-white border border-neutral-100 rounded-2xl flex justify-between gap-4 hover:border-neutral-200 transition-colors"
                    >
                      <div className="space-y-1 text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-neutral-900 truncate">{partner.name}</h4>
                          {partner.websiteUrl && (
                            <a 
                              href={partner.websiteUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-neutral-400 hover:text-brand-orange"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {partner.logoSvg && (
                            <span className="text-[7px] font-mono bg-emerald-50 text-emerald-600 px-1 rounded uppercase font-bold">
                              SVG
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-500 font-light leading-relaxed text-[11px] line-clamp-2">
                          {isRu ? partner.descriptionRu : partner.descriptionEn}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <button
                          onClick={(e) => handleDeletePartner(partner.id, e)}
                          className="p-1 px-1.5 opacity-100 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

          </div>
        )}

      </div>
    </div>
  );
}
