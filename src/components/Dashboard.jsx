import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Newspaper, Globe, Search, Bell } from 'lucide-react';

const mockChartData = [
  { time: '09:30', price: 150.2 },
  { time: '10:00', price: 152.1 },
  { time: '10:30', price: 151.8 },
  { time: '11:00', price: 153.5 },
  { time: '11:30', price: 152.9 },
  { time: '12:00', price: 154.2 },
  { time: '12:30', price: 155.1 },
  { time: '13:00', price: 154.8 },
  { time: '13:30', price: 156.4 },
  { time: '14:00', price: 157.0 },
  { time: '14:30', price: 156.2 },
  { time: '15:00', price: 158.5 },
  { time: '15:30', price: 159.1 },
  { time: '16:00', price: 160.0 },
];

const mockTrendingStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 2.34, percent: 1.37 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 338.11, change: -1.20, percent: -0.35 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 460.18, change: 15.20, percent: 3.42 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.82, change: 5.40, percent: 2.31 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 138.12, change: 1.15, percent: 0.84 }
];

export default function Dashboard() {
  const [demoStock, setDemoStock] = useState(null);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingStock, setLoadingStock] = useState(true);

  useEffect(() => {
    // Fetch Alpha Vantage Demo Stock (IBM)
    const fetchStock = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo');
        if (response.data && response.data['Global Quote']) {
          const data = response.data['Global Quote'];
          setDemoStock({
            symbol: data['01. symbol'],
            price: parseFloat(data['05. price']),
            change: parseFloat(data['09. change']),
            percent: data['10. change percent'],
            volume: data['06. volume']
          });
        }
      } catch (err) {
        console.error('Failed to fetch stock demo', err);
      } finally {
        setLoadingStock(false);
      }
    };

    // Fetch News (Using a free public proxy for top headlines)
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json');
        if (response.data && response.data.articles) {
          setNews(response.data.articles.slice(0, 5)); // Top 5 news
        }
      } catch (err) {
        console.error('Failed to fetch news', err);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchStock();
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans w-full box-border">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Activity className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Market Console</h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search markets..."
              className="bg-slate-800 border border-slate-700 text-sm rounded-full pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-200 placeholder-slate-400"
            />
          </div>
          <button className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition relative">
            <Bell size={20} className="text-slate-300" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
          </button>
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full cursor-pointer border-2 border-slate-700"></div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column (2/3 width on desktop) */}
        <div className="xl:col-span-2 space-y-6">

          {/* Market Overview Chart */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">S&P 500 Index</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-bold">4,514.87</span>
                  <div className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-sm font-medium">
                    <TrendingUp size={16} className="mr-1" />
                    +1.2%
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex gap-2">
                {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(period => (
                  <button
                    key={period}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${period === '1D' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trending Stocks List */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity size={18} className="text-indigo-400" />
              Trending Equities
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-slate-700">
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium text-right">Change</th>
                    <th className="pb-3 font-medium text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingStock ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-500">Loading live data...</td>
                    </tr>
                  ) : (
                    <>
                      {/* Live Demo Stock */}
                      {demoStock && (
                        <tr className="border-b border-slate-700/50 hover:bg-slate-750 transition group">
                          <td className="py-4">
                            <div className="font-semibold text-white">{demoStock.symbol}</div>
                            <div className="text-xs text-slate-400">Live Data Demo</div>
                          </td>
                          <td className="py-4 font-medium">${demoStock.price.toFixed(2)}</td>
                          <td className="py-4 text-right">
                            <div className={`inline-flex items-center gap-1 ${demoStock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {demoStock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              {demoStock.change > 0 ? '+' : ''}{demoStock.change.toFixed(2)} ({demoStock.percent})
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <div className="h-8 w-24 inline-block opacity-70 group-hover:opacity-100 transition">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockChartData}>
                                  <Line type="monotone" dataKey="price" stroke={demoStock.change >= 0 ? '#34d399' : '#fb7185'} strokeWidth={2} dot={false} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Mocked Trending Stocks */}
                      {mockTrendingStocks.map((stock) => (
                        <tr key={stock.symbol} className="border-b border-slate-700/50 hover:bg-slate-750 transition group last:border-0">
                          <td className="py-4">
                            <div className="font-semibold text-white">{stock.symbol}</div>
                            <div className="text-xs text-slate-400">{stock.name}</div>
                          </td>
                          <td className="py-4 font-medium">${stock.price.toFixed(2)}</td>
                          <td className="py-4 text-right">
                            <div className={`inline-flex items-center gap-1 ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.percent > 0 ? '+' : ''}{stock.percent}%)
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <div className="h-8 w-24 inline-block opacity-70 group-hover:opacity-100 transition">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockChartData}>
                                  <Line type="monotone" dataKey="price" stroke={stock.change >= 0 ? '#34d399' : '#fb7185'} strokeWidth={2} dot={false} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width on desktop) */}
        <div className="space-y-6 flex flex-col xl:h-full">

          {/* Quick Stats Widget */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-indigo-300 text-sm font-medium">Portfolio</span>
                <DollarSign size={16} className="text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">$24,562.00</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <TrendingUp size={12} />
                +2.4% Today
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Global Markets</span>
                <Globe size={16} className="text-slate-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1 flex items-center justify-between">
                <span>FTSE</span>
                <span className="text-rose-400 text-sm">-0.8%</span>
              </div>
              <div className="text-xl font-bold text-white flex items-center justify-between">
                <span>NIKKEI</span>
                <span className="text-emerald-400 text-sm">+1.4%</span>
              </div>
            </div>
          </div>

          {/* Latest News Widget */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg flex-grow flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Newspaper size={18} className="text-indigo-400" />
              Market News
            </h2>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 custom-scrollbar">
              {loadingNews ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-16 h-16 bg-slate-700 rounded-lg shrink-0"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-700 rounded w-full"></div>
                        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                        <div className="h-3 bg-slate-700 rounded w-1/3 mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : news.length > 0 ? (
                news.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 group block hover:bg-slate-750 p-2 -mx-2 rounded-lg transition"
                  >
                    {item.urlToImage ? (
                      <div className="w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-slate-700">
                        <img
                          src={item.urlToImage}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          onError={(e) => {e.target.style.display = 'none'}}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 shrink-0 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Newspaper size={20} className="text-slate-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-indigo-400 transition leading-snug">
                        {item.title}
                      </h3>
                      <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                        <span>{item.source.name}</span>
                        <span>•</span>
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-center text-slate-500 py-8">No news available</div>
              )}
            </div>

            <button className="w-full mt-4 py-2 border border-slate-600 rounded-lg text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition">
              View All News
            </button>
          </div>

        </div>
      </div>

      {/* Custom Scrollbar Styles appended inline for the widget */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}} />
    </div>
  );
}
